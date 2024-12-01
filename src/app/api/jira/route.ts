import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connect } from '@/lib/dbConfig';
import { Ticket } from '@/lib/model/ticketSchema';

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_TOKEN) {
    console.error('Missing required environment variables for Jira configuration.');
}

// function to query Jira
async function fetchJiraData(tickets: string[]): Promise<any[]> {
    if (tickets.length === 0) return [];

    try {
        const headers = {
            Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64')}`,
            'Content-Type': 'application/json',
        };

        const jiraEndpoint = `${JIRA_BASE_URL}/rest/api/latest/search?jql=key in (${tickets.join(',')})&expand=changelog`;
        const response = await axios.get(jiraEndpoint, { headers });

        return response.data.issues.map((issue: any) => {
            // const changelogEntries = issue.changelog.histories.map((history: any) => ({
            //     created: history.created,
            //     items: history.items.map((item: any) => ({
            //         field: item.field,
            //         from: item.fromString,
            //         to: item.toString,
            //     })),
            // }));

            return {
                key: issue?.key,
                summary: issue?.fields?.summary,
                status: {
                    name: issue?.fields?.status?.name,
                    issueStatus: issue?.fields?.status?.statusCategory?.name,
                },
                priority: issue?.fields?.priority?.name,
                createdAt: issue?.fields?.created,
                assignee: issue?.fields?.assignee?.displayName,
                assigneeImage: issue?.fields?.assignee?.avatarUrls?.['48x48'],
                reported: issue?.fields?.reporter?.displayName,
                reportedImage: issue?.fields?.reporter?.avatarUrls?.['48x48'],
                link: `${JIRA_BASE_URL}/browse/${issue.key}`,
                // changelog: changelogEntries,
            };
        });
    } catch (error: any) {
        console.error('Error querying Jira:', error.message);
        throw new Error('Failed to fetch ticket data from Jira');
    }
}

// API handler
export async function GET(req: NextRequest) {
    try {
        // Extract ticket type (e.g., oldTickets, newTickets) from query params
        const { searchParams } = new URL(req.url);
        const ticketType = searchParams.get('type');

        // Connect to the database
        await connect();

        // Fetch the latest ticket document
        const ticketData = await Ticket.findOne().sort({ createdAt: -1 });

        if (!ticketData) {
            return NextResponse.json({ error: 'No ticket data found' }, { status: 404 });
        }

        let tickets;

        if (ticketType) {
            
            // Fetch tickets of a specific type
            tickets = ticketData.modifiedTicketList?.[ticketType];
            if (!tickets || tickets.length === 0) {

                return NextResponse.json({ error: `No tickets found for type: ${ticketType}` }, { status: 404 });
            }

        } else {
            // Return all ticket types (combine all arrays into a single object)
            tickets = {
                newTickets: ticketData.modifiedTicketList?.newTickets || [],
                oldTickets: ticketData.modifiedTicketList?.oldTickets || [],
                holdTickets: ticketData.modifiedTicketList?.holdTickets || [],
                qaTickets: ticketData.modifiedTicketList?.qaTickets || [],
            };
        }

        // Prepare tickets for Jira fetching (single array for ticketType or multiple keys for all)
        const ticketsToFetch = Array.isArray(tickets)
            ? tickets
            : Object.values(tickets).flat();

            

        const jiraData = await fetchJiraData(ticketsToFetch);

        // Construct response based on requested data
        const response = ticketType
            ? { [ticketType]: jiraData }
            : {
                newTickets: jiraData.filter((t) => tickets.newTickets.includes(t.key)),
                oldTickets: jiraData.filter((t) => tickets.oldTickets.includes(t.key)),
                holdTickets: jiraData.filter((t) => tickets.holdTickets.includes(t.key)),
                qaTickets: jiraData.filter((t) => tickets.qaTickets.includes(t.key)),
            };

        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error: any) {
        console.error('Error in Jira API GET:', error.message);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
