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
