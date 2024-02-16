import { MessageType } from './type';

export interface Chat {
  name: string;
  content: string;
  type: MessageType;
}
