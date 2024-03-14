import { Context } from 'telegraf';
import createDebug from 'debug';
import { deleteData, fetchData, insertData } from '@/supabase';

const debug = createDebug('bot:about_command');

const test = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  //await fetchData();
  const data = await fetchData("Try_Members");
};

export { test };
