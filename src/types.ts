interface MsgModel {
  id: number;
  chat_id: number;
  user_id?: number;
  msg_type: string;
  msg?: string;
  reply_to?: number;
}

export { MsgModel };
