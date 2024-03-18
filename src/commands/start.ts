import { getOrCreateUser, inviteFromUser } from '@/supabase';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: any) => {
  debug(`Triggered "start" command with message`);
  const profileUrl = 'https://tgt-dashboard.vercel.app/profile/';

  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'url', url: profileUrl }]],
  };
  const userName = ctx.message?.from.username;
  const firstName = ctx.message?.from.first_name;
  const inviteFrom = ctx.payload;
  const userId = ctx.from.id;

  const user = await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );
  if (inviteFrom && user.length > 0) {
    //TODO: 防呆，如果已經有邀請者了，就不要再更新了。userId不能等於inviteFromId
    await inviteFromUser(userId, inviteFrom);
  }

  await ctx.replyWithMarkdownV2('test start', {
    reply_markup: keyboardMarkup,
    parse_mode: 'Markdown',
  });
};

export { start };
