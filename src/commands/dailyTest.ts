import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const WEB_APP_URL = 'https://feathers.studio/telegraf/webapp/example';

const dailyTest = () => async (ctx: Context) => {
  debug(`Triggered "dailyTest" command with message`);
  // await ctx.setChatMenuButton({
  //   text: 'Launch',
  //   type: 'web_app',
  //   web_app: { url: WEB_APP_URL },
  // });
  const message = `*Go To Your Daily Test \\!*`;
  await ctx.replyWithMarkdownV2(
    message,
    Markup.inlineKeyboard([Markup.button.webApp('📖', WEB_APP_URL)]),
  );
};

export { dailyTest };
