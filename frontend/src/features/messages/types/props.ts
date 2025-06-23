// src\features\messages\types\props.ts

import type { Message, User } from '@/features/messages/types';

// —————— Reutilizáveis ——————
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WithUsers {
  users: User[];
}

interface WithCurrentUser {
  currentUser: User;
}

interface WithCurrentUserId {
  currentUserId: string;
}

interface WithAttachments {
  attachments: File[];
  setAttachments: (files: File[]) => void;
}

interface SendCallback {
  onSend: () => void;
}

interface SendState {
  sending: boolean;
  disabled: boolean;
}

// —————— Props por componente ——————

interface AttachmentUploaderProps {
  attachments: File[];
  onAttachmentsChange: (files: File[]) => void;
  maxSize?: number;
}

interface MessageCardProps {
  message: Message;
  sender: User | undefined;
  onClick: () => void;
}

interface MessageDialogProps extends DialogProps {
  message: Message | null;
  sender: User | undefined;
}

interface MessageListProps extends WithUsers {
  messages: Message[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onMessageClick: (message: Message) => void;
}

interface NewMessageDialogProps extends DialogProps, WithUsers, WithCurrentUser {
  onSend: (recipientIds: string[], contentHtml: string, attachments: File[]) => Promise<void>;
}

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface UnreadBadgeProps {
  count: number;
}

interface RecipientSelectorProps extends WithUsers, WithCurrentUserId {
  selected: string[];
  onChange: (updated: string[]) => void;
}

interface NewMessageFooterProps extends SendCallback, SendState {
  onCancel: () => void;
}

interface NewMessageFormProps extends WithUsers, WithCurrentUser, WithAttachments {
  selectedRecipients: string[];
  setSelectedRecipients: (ids: string[]) => void;
  contentHtml: string;
  setContentHtml: (html: string) => void;
}

// Export agrupado para importação via namespace
export type {
  AttachmentUploaderProps,
  MessageCardProps,
  MessageDialogProps,
  MessageListProps,
  NewMessageDialogProps,
  RichTextEditorProps,
  UnreadBadgeProps,
  RecipientSelectorProps,
  NewMessageFooterProps,
  NewMessageFormProps,
};
