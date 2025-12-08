import supabase from "../config/supabaseClient.tsx";

export const ProductModel = {
  async getAll() {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(product_id: string) {
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .eq("product_id", product_id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async create(product: {
    product_name: string;
    product_price: number;
    product_imgurl?: string;
    advices_id?: number;
  }) {
    const { data, error } = await supabase
      .from("Product")
      .insert([product])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async update(
    product_id: string,
    product: Partial<{
      product_name: string;
      product_price: number;
      product_imgurl?: string;
      advices_id: number;
    }>,
  ) {
    const { data, error } = await supabase
      .from("Product")
      .update(product)
      .eq("product_id", product_id)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async delete(product_id: string) {
    const { error } = await supabase
      .from("Product")
      .delete()
      .eq("product_id", product_id);
    if (error) throw new Error(error.message);
    return { message: "Product deleted" };
  },
};
