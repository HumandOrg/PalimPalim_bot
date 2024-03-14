import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '@/supabase';

const debug = createDebug('bot:about_command');

const test = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  await fetchData();
};

export { test };
