import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const help = () => async (ctx: Context) => {
  const helpMsg = `\n/help - help information.\n/dashboard - Redirect to a dashboard page.\n/deposit - Redirect to a deposit page.\n/connect - Redirect to a profile connect page.\n/ai - Interact with OpenAI; take the text following /ai, input it into a prompt, and return the response.\n/verify - To verify you are a human.\n/ban - Only for admins.\n/unban - Only for admins.`;
  debug(`Triggered "about" command with message`);
  await ctx.replyWithMarkdownV2('help', { parse_mode: 'Markdown' });
};

export { help };
