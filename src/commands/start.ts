import { getOrCreateUser, inviteFromUser } from '@/supabase';
import createDebug from 'debug';
import { fetchinviter } from '@/supabase';
import { tableMap } from '@/types';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: any) => {
  debug(`Triggered "start" command with message`);
  const profileUrl = 'https://tgt-dashboard.vercel.app/profile/';

  const keyboardMarkup = {
    inline_keyboard: [[{ text: '你老媽', url: profileUrl }]],
  };
  const userName = ctx.message?.from.username;
  const firstName = ctx.message?.from.first_name;
  //console.log(ctx);
  const inviteFrom = ctx.payload;
  const userId = ctx.from.id;
  const data = await fetchinviter(tableMap.users, userId);
  const inviter = data[0].inviteFrom_id;
  console.log('1. inviter: ', inviter);
  console.log('2. inviteFrom: ', inviteFrom);
  console.log('3. userId: ', userId);
  //console.log('your inviter : ' + inviter);
  //console.log(ctx.message);
  //console.log('--------my name is:', userId,'-----------');

  const user = await getOrCreateUser(
    userId as number,
    userName ? userName : firstName ? firstName : '',
  );
  /*if (inviteFrom && user.length > 0) {
    //TODO: 防呆，如果已經有邀請者了，就不要再更新了。userId不能等於inviteFromId 1.自己不能邀請自己 2. 沒有邀請者 3. 邀請者已存在
    await inviteFromUser(userId, inviteFrom);
  }*/

  if (inviteFrom === '') {
    //console.log('you are not invited from anyone');
    await ctx.replyWithMarkdownV2('You are not invited from anyone', {
      // reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  } else if (inviteFrom === userId) {
    //console.log('you are invited from yourself');
    await ctx.replyWithMarkdownV2('You are invited from yourself', {
      // reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  } else {
    //const inviteString = `@${inviter}`;
    //console.log('you are invited from '+ inviteString);
    const value = inviteFrom == inviter ? inviteFrom : inviter;
    await ctx.replyWithMarkdownV2('You are invited from ' + value, {
      //reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    });
  }
  // else{
  //   console.log("false");
  // }

  /*await ctx.replyWithMarkdownV2('test start', {
    reply_markup: keyboardMarkup,
    parse_mode: 'Markdown',
  });*/
};

export { start };
