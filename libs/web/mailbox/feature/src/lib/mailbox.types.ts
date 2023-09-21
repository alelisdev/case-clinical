export interface Mail
{
    id?: string;
    type?: string;
    from?: {
        avatar?: string;
        contact?: string;
    };
    to?: string;
    cc?: string[];
    ccCount?: number;
    bcc?: string[];
    bccCount?: number;
    date?: string;
    subject?: string;
    content?: string;
    attachments?: {
        type?: string;
        name?: string;
        size?: number;
        preview?: string;
        downloadUrl?: string;
    }[];
    starred?: boolean;
    important?: boolean;
    unread?: boolean;
    folder?: string;
    labels?: string[];
}

export interface MailNew {
    id? : string;
    account_id? :string;
    bcc?: string[];
    cc?: string[];
    body?: string;
    date?: string;
    from?: {
        email?: string;
        name?: string;
    };
    labels?: {
        display_name: string;
        id:string;
        name: string
    }[];
    subject?: string;
    to?: {
        email: string;
        name: string;
    }[];
    unread: boolean;
    object: string;
    thread_id: string
}
export interface MailNewDraft {
  id? : string;
  account_id? :string;
  bcc?: {
    email?: string;
    name?: string;
  }[];
  cc?: {
    email?: string;
    name?: string;
  }[];
  body?: string;
  date?: string;
  from?: {
      email?: string;
      name?: string;
  };
  labels?: {
      display_name: string;
      id:string;
      name: string
  }[];
  subject?: string;
  to?: {
      email: string;
      name: string;
  }[];
  unread: boolean;
  object: string;
  thread_id: string;
  files: {
    id: string,
    content_type: string,
    size: number,
    filename: string,
    content_disposition: string
  }[]
}


export interface Pagination {
    totalResults: number,
    resultsPerPage: number,
    currentPage: number,
    lastPage: number,
    startIndex: number,
    endIndex: number
}

export interface MailCategory
{
    type: 'folder' | 'filter' | 'label';
    name: string;
}

export interface MailFolder
{
    id: string;
    title: string;
    slug: string;
    icon: string;
    count?: number;
}

export interface MailFilter
{
    id: string;
    title: string;
    slug: string;
    icon: string;
}

export interface MailLabel
{
    id: string;
    title: string;
}

export interface MailLabelNew
{
    id: string;
    name: string;
    account_id: string;
    color: string;
    display_name: string;
    object: string;
}

export interface MailLabeReq
{
    label: string;
    color: string;
}
