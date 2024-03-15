import { Context } from 'telegraf';
import createDebug from 'debug';
import { deleteData, fetchData, insertData, getOrCreateChatUser} from '@/supabase';
//import { getOrCreateChatUser } from '@/database';

const debug = createDebug('bot:about_command');

const test = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  //await fetchData();
  const data = await fetchData("Try_Members");//確定OK
  //console.log(data);
  const userID = 1;
  const chatID = 2;
  await getOrCreateChatUser(userID, chatID);
};

export { test };
