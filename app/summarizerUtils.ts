export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
};

export const formatEmailSubject = (date: Date): string => {
  return `Meeting Summary - ${formatDate(date)}`;
};

export enum ProcessingState {
  IDLE = 'idle',
  UPLOADING = 'uploading', 
  GENERATING = 'generating',
  EDITING = 'editing',
  SENDING = 'sending',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export enum FileType {
  TXT = 'text/plain',
  PDF = 'application/pdf',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}
