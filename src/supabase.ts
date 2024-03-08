import logger from '@/logger';
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 查询数据
export async function fetchData() {
  try {
    const { data, error } = await supabase.from('countries').select();
    if (error) {
      logger.error('Error fetching data:', error);
    }
    console.log('fetching data:', data);
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}
// 插入数据
export async function insertData() {
  try {
    const { data, error } = await supabase.from('table_name').insert([
      { column1: 'value1', column2: 'value2' },
      { column1: 'value3', column2: 'value4' },
    ]);
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
      .from('table_name')
      .delete()
      .eq('id', 1);
    if (error) {
      throw error;
    }
    console.log('Deleted data:', data);
  } catch (error) {
    logger.error('Error deleting data:', error);
  }
}
