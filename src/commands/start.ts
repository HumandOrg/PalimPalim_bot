import { getOrCreateUser, inviteFromUser, fetchInviter } from '@/supabase';
import createDebug from 'debug';
// import { fetchInviter } from '@/supabase';
import { tableMap } from '@/types';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: any) => {
  debug(`Triggered "start" command with message`);
  const profileUrl = 'https://tgt-dashboard.vercel.app/profile/';

  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'url', url: profileUrl }]],
  };
  const userName = ctx.message?.from.username;
  const firstName = ctx.message?.from.first_name;
  //console.log(ctx);
  const inviteFrom = ctx.payload;
  const userId = ctx.from.id;
  const data = await fetchInviter(tableMap.users, userId);
  const inviter = data[0].inviteFrom_id;
  const chatName = ctx.from.first_name;

  //console.log('1. inviter: ', inviter);
  //console.log('2. inviteFrom: ', inviteFrom);
  //console.log('3. userId: ', userId);
  //console.log('4. userName: ', userName);
  console.log(ctx.message);
  // console.log(ctx.from.first_name);

  const user = await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );
  /*if (inviteFrom && user.length > 0) {
    //TODO: 防呆，如果已經有邀請者了，就不要再更新了。userId不能等於inviteFromId 1.自己不能邀請自己 2. 沒有邀請者 3. 邀請者已存在
    await inviteFromUser(userId, inviteFrom);
  }*/

  await ctx.replyWithMarkdownV2(
    'Uncover a new syntax of your identity by hitting /start.',
    { parse_mode: 'Markdown' },
  );

  if (inviteFrom === '') {
    const message1 = `Hi ${chatName}!\n\nYou were not invited by anyone, but you can still use this bot!\n`;
    await ctx.replyWithMarkdownV2(
      /*'You are not invited from anyone'*/ message1,
      {
        parse_mode: 'Markdown',
      },
    );
  } else if (inviteFrom === userId) {
    const message2 = `Hi ${user.username}!\n\nThis is your own invitation link!\n\nSend it to your friends.`;
    await ctx.replyWithMarkdownV2(message2, {
      parse_mode: 'Markdown',
    });
  } else {
    //const inviteString = `@${inviter}`;
    //console.log('you are invited from '+ inviteString);
    const value = inviteFrom === inviter ? inviteFrom : inviter;
    console.log(value);
    if (value === null) {
      await ctx.replyWithMarkdownV2('You are not invited from anyone', {
        parse_mode: 'Markdown',
      });
    } else {
      await ctx.replyWithMarkdownV2('You are invited from ' + value, {
        //reply_markup: keyboardMarkup,
        parse_mode: 'Markdown',
      });
    }
  }

  /*await ctx.replyWithMarkdownV2('test start', {
    reply_markup: keyboardMarkup,
    parse_mode: 'Markdown',
  });*/
};

export { start };
