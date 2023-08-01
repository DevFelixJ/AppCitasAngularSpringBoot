export interface User {
  id: number;
  nickname: string;
  propic: string;
}

export interface Message {
  ms_id: number;
  sender: string;
  t_stamp: string;
  content: string;
}