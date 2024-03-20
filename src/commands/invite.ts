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
  const message = `Hi ${userData[0].username}!\n\nHere is your invitation link!\n\n${inviteLink}\n\nSend it to your friends and let them join us.`;
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { invite };
