import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const example = 'https://feathers.studio/telegraf/webapp/example';
const testUrl =
  'https://0f0b-2001-b400-e25e-4d31-5426-4af8-dce5-55d7.ngrok-free.app/';
const prodUrl = process.env.TMA_URL as string;
const ENVIRONMENT = process.env.NODE_ENV || '';

const dailyTest = () => async (ctx: Context) => {
  debug(`Triggered "dailytest" command with message`);
  const url = ENVIRONMENT !== 'production' ? testUrl : prodUrl;
  // await ctx.setChatMenuButton({
  //   text: 'Launch',
  //   type: 'web_app',
  //   web_app: { url: testUrl },
  // });
  const message = `*Go To Your Daily Test \\!*\nClick on the button below to launch your daily test\\!\n${ENVIRONMENT !== 'production' ? 'This is a test environment' : ''}`;
  await ctx.replyWithMarkdownV2(
    message,
    Markup.inlineKeyboard([Markup.button.webApp('📖', url)]),
  );
};

export { dailyTest };
