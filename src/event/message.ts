import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData, getOrCreateUser } from '@/supabase';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: {
      message_id: messageId,
    },
  });

const message = () => async (ctx: Context) => {
  debug('Triggered "message" event');
  const userId = ctx.message?.from.id;
  const userName = ctx.message?.from.username;
  const firstName = ctx.message?.from.first_name;
  const messageId = ctx.message?.message_id;
  await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );
  // if (messageId) {
  //   await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  // }
};

export { message };
