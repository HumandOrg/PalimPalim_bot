import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '@/supabase';
import { tableMap, UserData } from '@/types';

const debug = createDebug('bot:about_command');

const invite = () => async (ctx: Context) => {
  debug(`Triggered "invite" command with message`);
  const botName = process.env.BOT_NAME;
  const userData = (await fetchData(tableMap.users)) as UserData[];
  const userID = userData[0].user_id;
  const inviteLink = `https://t.me/${botName}?start=${userID}`;
  await ctx.replyWithMarkdownV2(inviteLink, { parse_mode: 'Markdown' });
};

export { invite };
