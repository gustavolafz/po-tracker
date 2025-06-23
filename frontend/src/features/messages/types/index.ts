// src\features\messages\types\index.ts

export type Message = {
  id: string;
  senderId: string;
  recipientIds: string[];
  contentHtml: string;
  attachments: Attachment[];
  createdAt: string;
  read: boolean;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type MessageFilter = {
  search: string;
  senderId?: string;
};
