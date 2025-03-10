import { connect } from "@/lib/dbConfig";
import axios from "axios";
import { JiraTicketsDetail } from "@/lib/model/jiraTicketDetailSchema";
import { ProcessedTickets } from "@/app/api/ticket/route";
// import JiraTicketsDetail

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_TOKEN) {
    console.error('Missing required environment variables for Jira configuration.');
}

//fetch ticket full detail from jira 
export async function getTicketDetailsFromJira(tickets: string[]): Promise<any[]> {
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
    } catch (error: unknown) {
        console.error('Error querying Jira:', error);
        throw new Error('Failed to fetch ticket data from Jira');
    }
}

// ticket array list detail fetch from jira and then store this in db 
export async function fetchAndStoreJiraDetails(modifiedTicketList: ProcessedTickets) {
    try {
        if (!modifiedTicketList) return;
        const categorizedTickets: Record<string, any[]> = {}; // Object to store category-wise tickets

        // MongoDB Connect
        await connect();

        const categories = Object.keys(modifiedTicketList) as (keyof ProcessedTickets)[];

        // ✅ Iterate over categories & fetch Jira details
        for (const item of categories) {
            const ticketNumbers = modifiedTicketList[item] || [];  // ✅ No more error
            const ticketDetails = await getTicketDetailsFromJira(ticketNumbers);
            categorizedTickets[item] = ticketDetails;
        }

        if (categorizedTickets) {
            await saveTicketsToDB(categorizedTickets, modifiedTicketList);
            return categorizedTickets
        }


    } catch (error) {
        console.error("🚀 ~ getting Error for fetching ticket detail from jira and stroing data in DB:", error);
    }
}

// Save Tickets to MongoDB
export async function saveTicketsToDB(
    categorizedTickets: { [key: string]: any[] },
    modifiedTicketList: ProcessedTickets
) {
    try {
        await connect();

        // const updateData = {
        //     modifiedTicketList,
        //     jiraTicketDetail: categorizedTickets,
        //     fetchedAt: new Date(),
        //     updatedAt: new Date(),
        //     deletedAt: null
        // };


        const JiraDetail = new JiraTicketsDetail({
            modifiedTicketList,
            jiraTicketDetail: categorizedTickets,
            fetchedAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        });
        await JiraDetail.save();
        //   const data  = await JiraTicketsDetail.findOneAndUpdate({}, { $set: updateData }, { upsert: true, new: true });

        console.log("✅ Successfully saved Jira ticket details as a single record");

    } catch (error) {
        console.error("🚀 ~ saveTicketsToDB error:", error);
    }
}
