import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '@/supabase';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: {
      message_id: messageId,
    },
  });

const message = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');
  console.log(ctx.message);
  const messageId = ctx.message?.message_id;
  const first_name = `${ctx.message?.from.first_name}`;
  const userName = `${ctx.message?.from.username}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { message };
