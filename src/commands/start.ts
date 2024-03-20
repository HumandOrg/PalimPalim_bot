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
  const userName = ctx.from.username;
  const firstName = ctx.from.first_name;
  const inviteFrom = ctx.payload;
  const userId = ctx.from.id;
  const data = await fetchInviter(userId);
  const inviter = data[0].inviteFrom_id;

  const name = userName ? userName : firstName ? firstName : '';

  const user = await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );
  const value = inviteFrom === inviter ? inviteFrom : inviter;

  await ctx.replyWithMarkdownV2(
    'Uncover a new syntax of your identity by hitting /start.',
    { parse_mode: 'Markdown' },
  );

  if (inviteFrom === '') {
    const message1 = `Hi ${name}!\n\nYou were not invited by anyone, but you can still use this bot!\n`;
    await ctx.replyWithMarkdownV2(message1, {
      parse_mode: 'Markdown',
    });
  } else if (inviteFrom === userId) {
    const message2 = `Hi ${name}!\n\nThis is your own invitation link!\n\nSend it to your friends.`;
    await ctx.replyWithMarkdownV2(message2, {
      parse_mode: 'Markdown',
    });
  } else {
    const message = value
      ? 'You are not invited from anyone'
      : `You are invited from ${value}`;
    await ctx.replyWithMarkdownV2(message, {
      parse_mode: 'Markdown',
    });
  }
};

export { start };
