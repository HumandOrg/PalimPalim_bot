import { Context } from 'telegraf';
import createDebug from 'debug';
import { getArtistData } from '@/supabase';

const debug = createDebug('bot:about_command');

const info = () => async (ctx: Context) => {
  debug(`Triggered "info" command with message`);
  const data = await getArtistData();

  await ctx.replyWithMarkdownV2('info', { parse_mode: 'Markdown' });
};

export { info };
