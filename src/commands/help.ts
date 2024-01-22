import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const help = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  await ctx.replyWithMarkdownV2('help', { parse_mode: 'Markdown' });
};

export { help };
