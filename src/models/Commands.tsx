import supabase from "../config/supabaseClient";

export const Commands = {
  async getAll() {
    const { data, error } = await supabase.from("Order").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getByUserId(user_id: number) {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .eq("user_id", user_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async create(order: {
    user_id: number;
    total_price: number;
    status?: string;
  }) {
    const { data, error } = await supabase
      .from("Order")
      .insert([order])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async update(
    id: number,
    order: Partial<{ user_id: number; total_price: number; status: string }>,
  ) {
    const { data, error } = await supabase
      .from("Order")
      .update(order)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async delete(id: number) {
    const { error } = await supabase.from("Order").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { message: "Order deleted" };
  },
};
