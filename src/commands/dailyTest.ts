import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const prodUrl = process.env.TMA_URL as string;

const dailyTest = () => async (ctx: Context) => {
  debug(`Triggered "dailytest" command with message`);
  const message = `*Go To Your Daily Test \\!*\nClick on the button below to launch your daily test\\!`;
  await ctx.replyWithMarkdownV2(
    message,
    Markup.inlineKeyboard([Markup.button.webApp('📖', prodUrl)]),
  );
};

export { dailyTest };
