import { Context } from 'telegraf';
import createDebug from 'debug';
import { tableMap } from '../types';
import { fetchData } from '../supabase';

const debug = createDebug('bot:about_command');

const info = () => async (ctx: Context) => {
  debug(`Triggered "info" command with message`);
  const data = await fetchData(tableMap.artist);
  const { describe, socialLink, name } = data && data[0];
  // console.log('socialLink', socialLink.x);
  await ctx.replyWithMarkdownV2(
    `Name => \n\n${name}\n\nDescribe => \n\n${describe}\n\nSocialLink =>  \n\nX : ${socialLink.x}  \nIG : ${socialLink.ig}  \nTG : ${socialLink.tg}`,
    {
      parse_mode: 'HTML',
    },
  );
};

export { info };
