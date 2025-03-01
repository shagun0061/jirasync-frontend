interface TicketStatus {
    name: string;
    issueStatus: string;
  }
  
export interface Ticket {
    status: TicketStatus;
    key: string;
    summary: string;
    priority: string;
    reported: string;
    reportedImage?: string;
    assignee?: string;
    assigneeImage?: string;
    link: string;
    createdAt: string;
    _id: string;
  }
  
  // Type for the tickets grouped by categories from API
  export interface TicketsResponse {
    currentTickets: Ticket[];
    newTickets: Ticket[];
    qaTickets: Ticket[];
    holdTickets: Ticket[];
  }
  
  // Overall API response type
  export interface ApiResponse {
    message: string;
    tickets: TicketsResponse;
  }
  export interface RowData {
    ticketNo: string;
    status: string;
    assignee: string;
    assigneeImage?: string; 
    reportedBy: string;
    reportedByImage?: string; 
    priority: string;
    Link: string;
  }
  
  // Component props type
  export interface FilterProp {
    filter: string;
    tickets: Ticket[]
    loading?: boolean;
  }