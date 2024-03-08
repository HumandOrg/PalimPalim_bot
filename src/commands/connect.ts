import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const connect = () => async (ctx: Context) => {
  debug(`Triggered "connect" command with message`);
  const profileUrl = 'https://tgt-dashboard.vercel.app/profile/';

  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'Connect Wallet', url: profileUrl }]],
  };

  await ctx.replyWithMarkdownV2('Connect Wallet', {
    reply_markup: keyboardMarkup,
    parse_mode: 'Markdown',
  });
};

export { connect };
