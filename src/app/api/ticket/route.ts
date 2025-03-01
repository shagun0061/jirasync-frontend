import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connect } from '@/lib/dbConfig';
import { Ticket } from '@/lib/model/ticketSchema';
import { getValidBoardsFromJira } from '../jira/route';
import { fetchAndStoreJiraDetails } from '@/services/jiraService';
import { JiraTicketsDetail } from '@/lib/model/jiraTicketDetailSchema';


const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_TOKEN) {
  console.error('Missing required environment variables for Jira configuration.');
}
interface TicketList {
  currentTickets: number[];
  newTickets: number[];
  qaTickets: number[];
  holdTickets: number[];
}
export interface ProcessedTickets {
  currentTickets: string[];
  newTickets: string[];
  qaTickets: string[];
  holdTickets: string[];
}

// ticket combination creates with there board 
async function createTicketCombination(ticketList: TicketList): Promise<{ finalTicketList: ProcessedTickets }> {
  try {
    const finalTicketList: ProcessedTickets = {
      currentTickets: [],
      newTickets: [],
      qaTickets: [],
      holdTickets: []
    };

    // Store tickets where board is uncertain
    const ticketsToCheckInJira: Record<string, string[]> = {};

    // Loop through each category in the ticket list
    for (const category in ticketList) {
      const tickets = ticketList[category as keyof TicketList];

      for (const ticket of tickets) {
        const ticketStr = ticket.toString();
        let possibleBoards: string[] = [];

        // Assign board prefixes based on ticket number
        if (ticketStr.startsWith('1') || ticketStr.startsWith('0')) {
          possibleBoards = [`E2D-1${ticket}`];
        } else if (ticketStr.startsWith('5') || ticketStr.startsWith('8') || ticketStr.startsWith('9')) {
          possibleBoards = [`E2D-${ticket}`];
        } else if (ticketStr.startsWith('6') || ticketStr.startsWith('7')) {
          possibleBoards = [`LEG2-${ticket}`];
        } else if (ticketStr.startsWith('2')) {
          possibleBoards = [`E2D-1${ticket}`, `ELNKWEB-${ticket}`];
        }

        // If multiple board options exist, store for Jira check
        if (possibleBoards.length > 1) {
          ticketsToCheckInJira[ticketStr] = possibleBoards;
        } else {
          // If only one valid board, directly assign
          finalTicketList[category as keyof ProcessedTickets].push(possibleBoards[0]);
        }
      }
    }



    // Call Jira API only for tickets where board is not confirmed
    const resolvedTickets = await getValidBoardsFromJira(ticketsToCheckInJira);

    // Merge resolved Jira tickets board into the final list
    for (const [ticket, finalBoard] of Object.entries(resolvedTickets)) {

      // Loop through every category in the original ticketList
      for (const category in ticketList) {
        console.log("🚀 ~ createTicketCombination ~ ticketList:", ticketList);

        // Compare as strings (remove parseInt) so "2150" matches "2150"
        if (ticketList[category as keyof TicketList].includes(ticket)) {

          // Add the resolved board to the corresponding category in finalTicketList
          finalTicketList[category as keyof ProcessedTickets].push(finalBoard);
        }
      }
    }




    return { finalTicketList };
  } catch (error) {
    console.error("Error in createTicketCombination:", error);
    throw error; // Rethrow so that the caller can handle it.
  }
}

// using this api for board generate and stroing that jira detail info in db 
export async function POST(req: NextRequest,) {
  try {

    const payload = await req.json();

    if (!payload?.ticketList) {
      return NextResponse.json({ error: 'Ticket list is required' }, { status: 400 });
    }

    // Generate the categorized ticket list
    const { finalTicketList } = await createTicketCombination(payload?.ticketList);

    await connect();
    const ticketId = uuidv4();

    // Ticket lists Store in DB
    const newTicket = new Ticket({
      id: new Date().getTime().toString(), // Unique ID
      originalTicketList: payload?.ticketList,
      modifiedTicketList: finalTicketList,
    });
    await newTicket.save();


    // function to fetch Jira details & store in DB**
    // await fetchAndStoreJiraDetails(finalTicketList);
    return NextResponse.json({ message: 'Tickets List stored successfully', ticketId, data: newTicket }, { status: 201 });

  } catch (error: any) {
    console.error('Error getting to store ticket list in db:', error.message);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}



// fetch or get jira ticket detail with category 
export async function GET(req: NextRequest) {
  try {
    // Parse query parameters (e.g., ?category=newTickets)
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Connect to MongoDB
    await connect();

    // Step 1: Fetch the latest Ticket record which holds the modifiedTicketList
    const latestTicketRecord = await Ticket.findOne(
      {},
      { modifiedTicketList: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(1);

    if (!latestTicketRecord) {
      return NextResponse.json(
        { message: "No ticket records found" },
        { status: 404 }
      );
    }

    // Step 2: Refresh Jira details by calling fetchAndStoreJiraDetails
    // This function should fetch fresh Jira details based on the modifiedTicketList
    await fetchAndStoreJiraDetails(latestTicketRecord.modifiedTicketList);

    // Step 3: Retrieve the updated Jira details from the JiraTicketsDetail collection
    const jiraRecord = await JiraTicketsDetail.findOne({}).sort({ updatedAt: -1 });
    if (!jiraRecord) {
      return NextResponse.json(
        { message: "No Jira ticket details found" },
        { status: 404 }
      );
    }

    // Step 4: Prepare the response based on the category query parameter

    if (category) {
      // If a specific category is requested, return that category's Jira details
      const tickets = jiraRecord.jiraTicketDetail || [];
      return NextResponse.json({
        message: `Fetched ${category} successfully`,
        tickets,
      });
    } else {
      // Otherwise, return the entire jiraTicketDetail object containing all categories
      return NextResponse.json({
        message: "Fetched all categories successfully",
        tickets: jiraRecord.jiraTicketDetail,
      });
    }
  } catch (error) {
    console.error("Error in GET /api/tickets:", error);
    return NextResponse.json(
      { message: "Failed to fetch ticket details", error },
      { status: 500 }
    );
  }
}

