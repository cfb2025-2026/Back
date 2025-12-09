import supabase from "../config/supabaseClient";

export const ProductInCommandsModel = {
  async create(link: { product_id: number; order_id: number }) {
    const { data, error } = await supabase
      .from("ProductInCommand")
      .insert([link])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },
};
