import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const dailyTest = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n${author}`;
  await ctx.replyWithMarkdownV2('dailyTest', { parse_mode: 'Markdown' });
};

export { dailyTest };
