import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const testUrl = 'https://cd52-118-103-63-140.ngrok-free.app';
const ENVIRONMENT = process.env.NODE_ENV || '';

const testURL = () => async (ctx: Context) => {
  debug(`Triggered "dailytest" command with message`);

  const message = `*Go To Your Daily Test \\!*\nClick on the button below to launch your daily test\\!\nThis is a test environment`;
  await ctx.replyWithMarkdownV2(
    message,
    Markup.inlineKeyboard([Markup.button.webApp('📖', testUrl)]),
  );
};

export { testURL };
