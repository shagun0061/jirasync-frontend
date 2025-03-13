
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import { RowData, Ticket } from '.';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

export const getPriorityIcon = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'highest':
      return (
        <ErrorOutlineIcon
          sx={{ color: '#d04437', fontSize: 18 }} // Dark Red (Jira style)
          titleAccess="Highest Priority"
        />
      );
    case 'high':
      return (
        <LabelImportantIcon
          sx={{ color: '#f29220', fontSize: 18 }} // Orange
          titleAccess="High Priority"
        />
      );
    case 'medium':
      return (
        <DensityMediumIcon
          sx={{ color: '#ffcc00', fontSize: 18 }} // Yellow
          titleAccess="Medium Priority"
        />
      );
    case 'low':
      return (
        <ArrowDownwardIcon
          sx={{ color: '#14892c', fontSize: 18 }} // Green
          titleAccess="Low Priority"
        />
      );
    case 'lowest':
      return (
        <ArrowDownwardIcon
          sx={{ color: '#2055b6', fontSize: 18 }} // Blue
          titleAccess="Lowest Priority"
        />
      );
    default:
      return (
        <PriorityHighIcon
          sx={{ color: 'gray', fontSize: 18 }}
          titleAccess="Normal Priority"
        />
      );
  }
};
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

  // Custom Alert Component
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
