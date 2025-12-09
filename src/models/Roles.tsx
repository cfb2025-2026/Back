import supabase from "../config/supabaseClient";

export const Roles = {
  async getAll() {
    const { data, error } = await supabase.from("Roles").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async create(role: {
    admin_id?: number;
    seller_id?: number;
    buyer_id?: number;
  }) {
    const { data, error } = await supabase
      .from("Roles")
      .insert([role])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },
};
