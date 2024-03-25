import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '../supabase';
import { TableName } from '../types';

const debug = createDebug('bot:about_command');

const test = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  //await fetchData();
  const data = await fetchData('users' as TableName);
  // console.log('data : ', data);
  // console.log(data.user_id);
  //console.log(data);
  // const userID = 1;
  // const chatID = 2;
  //   await getOrCreateUser(userID);
};

export { test };
