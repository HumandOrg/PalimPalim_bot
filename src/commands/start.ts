import { getOrCreateUser } from '@/supabase';
import createDebug from 'debug';
import { fetchInviter } from '@/supabase';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: any) => {
  debug(`Triggered "start" command with message`);
  const profileUrl = process.env.TMA_URL;
  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'url', url: profileUrl }]],
  };
  const userName = ctx.message?.from.username;
  const firstName = ctx.message?.from.first_name;
  const inviteFrom = ctx.payload;
  const userId = ctx.from.id;
  const data = await fetchInviter(userId);
  const inviter = data && data[0]?.inviteFrom_id;

  const user = await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );

  if (inviteFrom === '') {
    await ctx.replyWithMarkdownV2('Welcome! You are not invited from anyone', {
      // reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  } else if (inviteFrom === userId) {
    await ctx.replyWithMarkdownV2('You connot invite yourself', {
      // reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  } else {
    const value = inviteFrom == inviter ? inviteFrom : inviter;
    await ctx.replyWithMarkdownV2('You are invited from ' + value, {
      //reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  }
};

export { start };
