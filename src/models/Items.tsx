import supabase from "../config/supabaseClient";

export const ItemModel = {
  async getAll() {
    const { data, error } = await supabase.from("Item").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async create(item: { name: string; quantity: number; product_id: number }) {
    const { data, error } = await supabase.from("Item").insert([item]).select();
    if (error) throw new Error(error.message);
    return data[0];
  },
};
