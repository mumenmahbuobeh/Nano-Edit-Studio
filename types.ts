export interface GeneratedImage {
  base64: string;
  mimeType: string;
}

export interface AppError {
  message: string;
  details?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}