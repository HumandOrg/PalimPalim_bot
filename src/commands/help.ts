import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const help = () => async (ctx: Context) => {
  debug(`Triggered "help" command with message`);

  const helpMsg = `Let me help you to know how to use me:
*Commands :*
/help - Let me help you to know how to use me
/info - Artist info
/invite - Get your referral link`;
  await ctx.replyWithMarkdownV2(helpMsg, { parse_mode: 'Markdown' });
};

export { help };
