import supabase from "../config/supabaseClient";

export const SellerModel = {
  async getAll() {
    const { data, error } = await supabase.from("Seller").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from("Seller")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async create(seller: { name: string }) {
    const { data, error } = await supabase
      .from("Seller")
      .insert([seller])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async update(id: number, seller: { name?: string }) {
    const { data, error } = await supabase
      .from("Seller")
      .update(seller)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async delete(id: number) {
    const { error } = await supabase.from("Seller").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { message: "Seller deleted" };
  },
};
