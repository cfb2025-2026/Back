import supabase from "../config/supabaseClient.tsx";

export const ProductModel = {
  async getAll() {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getImages(product_id: string) {
    const { data, error } = await supabase
      .from("Product_Img")        // table des images
      .select("image_id, image_url")
      .eq("product_id", product_id);

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

   async getByFilter(filter: {
    category_id?: string;
    attribute_id?: string;
  }) {
    const { category_id, attribute_id } = filter;

    // 1) on part de la table de liaison
    let query = supabase
      .from("Product_Attribute_Category")
      .select("product_id");

    if (category_id) query = query.eq("category_id", category_id);
    if (attribute_id) query = query.eq("attribute_id", attribute_id);

    const { data: links, error } = await query;
    if (error) throw new Error(error.message);

    const productIds = [...new Set((links ?? []).map((l: any) => l.product_id))];

    if (productIds.length === 0) return [];

    // 2) on va chercher les produits correspondants
    const { data: products, error: error2 } = await supabase
      .from("Product")
      .select("*")
      .in("product_id", productIds);

    if (error2) throw new Error(error2.message);
    return products;
  },
};
