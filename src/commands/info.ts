import { Context } from 'telegraf';
import createDebug from 'debug';
import { tableMap } from '../types';
import { fetchData } from '../supabase';

const debug = createDebug('bot:about_command');

const info = () => async (ctx: Context) => {
  debug(`Triggered "info" command with message`);
  const data = await fetchData(tableMap.artist);
  const { describe, socialLink, name } = data && data[0];
  await ctx.replyWithMarkdownV2(
    `*${name}*\n\n${describe}\n\nX : ${socialLink.x}  \nIG : ${socialLink.ig}  \nTG : ${socialLink.tg}`,
    {
      parse_mode: 'Markdown',
    },
  );
};

export { info };
