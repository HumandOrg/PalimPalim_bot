import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: Context) => {
  debug(`Triggered "connect" command with message`);
  const profileUrl = 'https://tgt-dashboard.vercel.app/profile/';

  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'url', url: profileUrl }]],
  };

  await ctx.replyWithMarkdownV2('test start', {
    reply_markup: keyboardMarkup,
    parse_mode: 'Markdown',
  });
};

export { start };
