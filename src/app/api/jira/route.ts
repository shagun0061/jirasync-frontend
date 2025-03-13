import { getValidBoardsFromJira } from "../utils/jira";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // expecting { ticketsToCheck: { [ticket: string]: string[] } }

    if (!body.ticketsToCheck) {
      return new Response(JSON.stringify({ error: 'Missing ticketsToCheck in request body' }), { status: 400 });
    }

    const result = await getValidBoardsFromJira(body.ticketsToCheck);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
