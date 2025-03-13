export interface JiraIssue {
    key: string;
    fields: {
      summary: string;
      status: {
        name: string;
        statusCategory: {
          name: string;
        };
      };
      priority?: {
        name: string;
      };
      created: string;
      assignee?: {
        displayName: string;
        avatarUrls?: {
          '48x48'?: string;
        };
      };
      reporter?: {
        displayName: string;
        avatarUrls?: {
          '48x48'?: string;
        };
      };
    };
  }
  export interface TicketDetail {
    key: string;
    summary: string;
    status: {
      name: string;
      issueStatus: string;
    };
    priority?: string;
    createdAt: string;
    assignee?: string;
    assigneeImage?: string;
    reported?: string;
    reportedImage?: string;
    link: string;
  }