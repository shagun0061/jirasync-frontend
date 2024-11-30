import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'; 
import { connect } from '@/lib/dbConfig';
import { Ticket } from '@/lib/model/ticketSchema';

interface TicketList {
    oldTickets: number[];
    newTickets: number[];
    qaTickets: number[];
    holdTickets: number[];
}

interface ModifiedTicketList {
    oldTickets: string[];
    newTickets: string[];
    qaTickets: string[];
    holdTickets: string[];
}

function generateTicketCombinations(ticketList: TicketList): { modifiedList: ModifiedTicketList, } {
    const modifiedList: ModifiedTicketList = {
        oldTickets: [],
        newTickets: [],
        qaTickets: [],
        holdTickets: []
    };
    // Process each ticket category
    for (const category in ticketList) {
        const tickets = ticketList[category as keyof TicketList];
        modifiedList[category as keyof ModifiedTicketList] = tickets.flatMap((ticket: number) => {
            const ticketStr = ticket.toString();

            if (ticketStr.startsWith('1') || ticketStr.startsWith('0')) {
                return `E2D-1${ticket}`;
            } else if (ticketStr.startsWith('5') || ticketStr.startsWith('8') || ticketStr.startsWith('9')) {
                return `E2D-${ticket}`;
            } else if (ticketStr.startsWith('6') || ticketStr.startsWith('7')) {
                return `LEG2-${ticket}`;
            } else if (ticketStr.startsWith('2')) {
                return `ELNKWEB-${ticket}`;
            }

            return ticketStr;
        });
    }

    return { modifiedList };
}

// Function to fetch ticket board
// async function queryJiraForTickets(tickets: string[]): Promise<any[]> {
//     try {
//         const headers = {
//             Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64')}`,
//             'Content-Type': 'application/json',
//         };

//         const jiraEndpoint = `${JIRA_BASE_URL}/rest/api/latest/search?jql=key in (${tickets.join(',')})&fields=summary,status`;
//         const response = await axios.get(jiraEndpoint, { headers });
       

//         return response.data.issues.map((issue: any) => ({
//             key: issue.key,
//             status: issue.fields.status.name,
//         }));
//     } catch (error: any) {
//         console.error('Error querying Jira:', error.message);
//         throw new Error('Failed to fetch ticket data from Jira');
//     }
// }

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        if (!payload?.ticketList) {
            return NextResponse.json({ error: 'Ticket list is required' }, { status: 400 });
        }

        const { modifiedList } = generateTicketCombinations(payload.ticketList);
        

        await connect();
        const ticketId = uuidv4();

        const newTicket = new Ticket({
            id: ticketId,
            originalTicketList: payload.ticketList,
            modifiedTicketList:  modifiedList,
        });

        await newTicket.save();

        return NextResponse.json({ ticketId, modifiedList }, { status: 200 });
    } catch (error: any) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
