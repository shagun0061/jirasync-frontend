
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { RowData, Ticket } from '.';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#454545",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export function statusColor(status: string): { backgroundColor: string; color: string } {
  const statusColors: { [key: string]: { backgroundColor: string; color: string } } = {
    "In Progress": { backgroundColor: "#D1E9FC", color: "#1565C0" },  // Light Sky Blue
    "RELEASED": { backgroundColor: "#1e855a", color: "#fffaf6" },           // Soft Green
    "Code Review": { backgroundColor: "#F8E1F5", color: "#6A1B9A" }, // Lavender
    "Dev Testing": { backgroundColor: "#FFF9C4", color: "#F9A825" }, // Pale Yellow
    "QA TESTING": { backgroundColor: "#B2EBF2", color: "#00838F" },  // Bright Aqua
    "To Do": { backgroundColor: "#ECEFF1", color: "#455A64" }         // Soft Gray
  };

  // Default: White background with black text for undefined statuses
  return statusColors[status] || { backgroundColor: "#FFFFFF", color: "#000000" };
} 

export const mapTicketsToRows = (tickets: Ticket[]): RowData[] => {
  const unassignedImage = 'https://secure.gravatar.com/avatar/?d=mm&s=32';
  return tickets?.map((ticket) => ({
      ticketNo: ticket?.key,
      status: ticket?.status?.name,
      assignee: ticket?.assignee ? ticket?.assignee : 'Unassigned',
      assigneeImage: ticket?.assigneeImage ?? unassignedImage, // Use assignee image or reported image
      reportedBy : ticket?.reported,
      reportedByImage: ticket?.reported ? ticket?.reportedImage : ticket?.reportedImage, // Use assignee image or reported image
      priority: ticket?.priority,
      Link: ticket?.link,
  })) || [];
};



export function extractTicketNumbers(input: string): string[] {
  // Regex to match exactly 4 digits followed immediately by a semicolon.
  const regex = /(\d{4});/g;
  const tickets: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    // Do not use parseInt here, so that a value like "0863" is preserved as "0863"
    tickets.push(match[1]);
  }
  return tickets;

}
  export function buildTicketPayload(ticketData: {
    qaTicketList: string;
    newTicketList: string;
    holdTicketList: string;
    continueTicketList: string;
  }) {
    return {
      ticketList: {
        currentTickets: extractTicketNumbers(ticketData.continueTicketList),
        newTickets: extractTicketNumbers(ticketData.newTicketList),
        qaTickets: extractTicketNumbers(ticketData.qaTicketList),
        holdTickets: extractTicketNumbers(ticketData.holdTicketList)
      }
    };
  }

  export  const fetchTicketDetailByCategory = async (filter: string) => {
    try {
      const url =
        filter !== "All" ? `/api/ticket?category=${filter}` : `/api/ticket`;
  
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch tickets, status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error in fetchTicketDetailByCategory:", error);
      throw error;
    }
  };