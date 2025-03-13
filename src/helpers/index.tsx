interface TicketStatus {
    name: string;
    issueStatus: string;
  }
  
export interface Ticket {
  category?: string;
  status: TicketStatus;
  key: string;
  summary: string;
  priority: string;
  reported: string;
  reportedBy?: string;
  reportedImage?: string;
  assignee?: string;
  assigneeImage?: string;
  link: string;
  createdAt: string;
  _id: string;
}

  export interface TicketEditableRowProps {
    row: RowData; 
    category: string;
    onRowUpdate?: (updatedRow: Ticket[]) => void;
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
  export interface TicketsByCategory {
    continue?: Ticket[];
    new?: Ticket[];
    qa?: Ticket[];
    hold?: Ticket[];
  }
  

  export interface SearchTicketProps {
    searchValue: string;
    tickets?: TicketsByCategory;
    combinedTickets: Ticket[];
  }
  
  export interface RowData {
    ticketNo: string;
    status: string;
    assignee: string;
    assigneeImage?: string; 
    reportedBy: string;
    reported?: string
    reportedByImage?: string; 
    reportedImage?: string
    priority: string;
    Link: string;
  }

  // Component props type
  export interface TicketListingDetailProp {
    title: string,
    filter: string;
    tickets?: Ticket[]
    loading?: boolean;
    error?: string;
  }

  export interface TicketListRefreshProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}