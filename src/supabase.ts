import logger from '@/logger';
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



// 查询数据
export async function fetchData(table_name:any) {
  //console.log(table_name);
  try {
    const { data, error } = await supabase.from(table_name).select();
    if (error) {
      logger.error('Error fetching data:', error);
      return;
    }
    return data;
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}
export async function getArtistData() {
  try {
    const { data, error } = await supabase.from('artists').select();
    if (error) {
      logger.error('Error fetching data:', error);
    }
    console.log('fetching data:', data);
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}
// 插入数据
export async function insertData(data:number, ) {
  try {
    const { data, error } = await supabase.from('Try_Members').insert(
      { id: "1", 
        //created_at: "",
        email: "111"
      }
      );
    if (error) {
      throw error;
    }
    console.log('Inserted data:', data);
  } catch (error) {
    logger.error('Error inserting data:', error);
  }
}

// 更新数据
export async function updateData() {
  try {
    const { data, error } = await supabase
      .from('table_name')
      .update({ column1: 'new_value' })
      .eq('id', 1);
    if (error) {
      throw error;
    }
    console.log('Updated data:', data);
  } catch (error) {
    logger.error('Error updating data:', error);
  }
}

// 删除数据
export async function deleteData() {
  try {
    const { data, error } = await supabase
      .from('Try_Members')
      .delete()
      .eq('email', 111);
    if (error) {
      throw error;
    }
    console.log('Deleted data:', data);
  } catch (error) {
    logger.error('Error deleting data:', error);
  }
}

export async function getOrCreateChatUser(chatId:any, userId:any) {
  try {
    // 檢查是否存在使用者
    //console.log(chatId, userId);
    const { data: existingUser, error: userError } = await supabase
      .from('chat_members')
      .select('*')
      .eq('user_id', userId) 
      .eq('chat_id', chatId)
      //.single(); // 返回單一結果 //這個不知道是啥，要再研究一下,多這一行會跑錯誤訊息

    if (userError) { 
      throw userError; 
    }

    if (!existingUser) { // 如果已經存在使用者，existinguser是空
      console.log(existingUser);
      return existingUser; // 返回現有使用者
    } else { // 如果不存在使用者，創建新使用者
      const { data: newUser, error: newUserError } = await supabase
        .from('chat_members') 
        .insert([{ chat_id: chatId, user_id: userId }]) // 插入新使用者資料
        .single(); // 返回單個結果

      if (newUserError) { 
        throw newUserError; 
      }
      //console.log("2. Created Success");

      // 查詢並返回新建的使用者數據
      const { data: newUserRows, error: newUserRowsError } = await supabase
        .from('chat_members') 
        .select('*') 
        .eq('user_id', userId) 
        .single(); // 返回單個結果

      if (newUserRowsError) {
        throw newUserRowsError;
      }
      //console.log("3. search success");
      //console.log(userId, chatId);
      return newUserRows;
    }
  } catch (error) { 
    logger.error('Error creating user:', error); 
  }
}