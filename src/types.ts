export type TableName =
  | 'artist'
  | 'user'
  | 'msgs'
  | 'chat_members'
  | 'group_config'
  | 'group_tags'
  | 'user_in_chat';
export const tableMap: Record<TableName, TableName> = {
  artist: 'artist',
  user: 'user',
  msgs: 'msgs',
  chat_members: 'chat_members',
  group_config: 'group_config',
  group_tags: 'group_tags',
  user_in_chat: 'user_in_chat',
};
