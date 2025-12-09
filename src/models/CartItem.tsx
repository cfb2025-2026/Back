import supabase from "../config/supabaseClient.tsx";

export const CartItemModel = {
  async create(link: { cart_id: string; item_id: string }) {
    const { data, error } = await supabase
      .from("CartItem")
      .insert([link])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },
};
