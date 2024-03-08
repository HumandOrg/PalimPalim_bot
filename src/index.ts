import { Telegraf } from 'telegraf';
import { about, connect, help, start } from './commands';
import { message, leftMem, newMem } from './event/index';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const bot = new Telegraf(BOT_TOKEN);
// 使用 filter utils 來過濾新成員加入事件
const newMembersHandler = newMem();

// 使用 filter utils 來過濾成員離開事件
// const leftMemberHandler = ();

// // 設置處理新成員加入事件的中間件
// bot.on(newMembersHandler, (ctx) => {
//     // 在這裡處理新成員加入事件的邏輯
//     console.log('新成員加入：', ctx.update.message.new_chat_members);
// });

// // 設置處理成員離開事件的中間件
// bot.on(leftMemberHandler, (ctx) => {
//     // 在這裡處理成員離開事件的邏輯
//     console.log('成員離開：', ctx.update.message.left_chat_member);
// });

bot.command('about', about());
bot.command('help', help());
bot.command('start', start());
bot.command('connect', connect());
bot.on('message', message());
bot.on('new_chat_members', newMem());
bot.on('left_chat_member', leftMem());

// bot.on('sticker', (ctx) => ctx.reply('👍'));

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
