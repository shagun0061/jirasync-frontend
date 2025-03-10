const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_TOKEN) {
    console.error('Missing required environment variables for Jira configuration.');
}

interface JiraTicketResponse {
    key: string;
    status: string;
    assignee: string | null;
    created: string; 
}
/**
 * Function to check valid board .
 */
export async function getValidBoardsFromJira(
    ticketsToCheck: Record<string, string[]>
): Promise<Record<string, string>> {
    

    try {
    const resolvedBoards: Record<string, string> = {};

    for (const [ticket, boardOptions] of Object.entries(ticketsToCheck)) {
        let selectedBoard: string | null = null;
        let latestCreatedDate: Date | null = null;

        for (const boardTicket of boardOptions) {
            const jiraResponse = await fetchJiraTicketStatus(boardTicket);
            console.log("🚀 ~ jiraResponse:", jiraResponse)

            if (jiraResponse) { // Ensure response is valid
                const { status, created } = jiraResponse;
                if (
                    status === 'In Progress' ||
                    status === 'Dev Testing' ||
                    status === 'To Do' ||
                    status === 'QA TESTING'
                  ) {

                    const ticketCreatedDate = new Date(created);

                    // If no selected board OR ticket has a more recent created date, update selection
                    if (!latestCreatedDate || ticketCreatedDate > latestCreatedDate) {
                        selectedBoard = boardTicket;
                        console.log("🚀 ~ selectedBoard:", selectedBoard)
                        latestCreatedDate = ticketCreatedDate;
                    }
                }
            }
        }
        // Assign the most recently created valid board ticket (if found)
        resolvedBoards[ticket] = selectedBoard ?? (boardOptions.find(b => b !== selectedBoard) ?? boardOptions[0]);
    }
    console.log('resolvedBoards-----------', resolvedBoards);
    return resolvedBoards;

} catch (error) {
    console.error("Error in getValidBoardsFromJira:", error);
    throw error; // Rethrow the error so the caller can handle it.

  }
}


/**
 * Function is used to validate board,fetching ticket status from Jira .
 * 
 */
async function fetchJiraTicketStatus(ticketNumber: string): Promise<JiraTicketResponse | null> {
    
    const JIRA_API_URL = `${JIRA_BASE_URL}/rest/api/3/issue/${ticketNumber}`;
    try {
        const response = await fetch(JIRA_API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL +":" + JIRA_TOKEN}`).toString('base64')}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) return null;

        const data = await response.json();

   // Convert the created date into a more readable format (YYYY-MM-DD HH:mm)
        const createdDate = new Date(data?.fields?.created ?? '').toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, 
        });

        return { 
            key: data?.key || '',  
            status: data?.fields?.status?.name || 'Unknown',  
            assignee: data?.fields?.assignee?.displayName || null,
            created: createdDate 
        };

        
    } catch (error) {
        console.error(`Error fetching Jira ticket for confirming the board  ${ticketNumber}:`, error);
        return null;
    }
}
