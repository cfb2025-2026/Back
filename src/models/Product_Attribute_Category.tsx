import supabase from "../config/supabaseClient";

export const ProductAttributeCategoryModel = {
  async create(link: {
    product_id: string;
    attribute_id: string;
    category_id: string;
  }) {
    const { data, error } = await supabase
      .from("Product_Attribute_Category")
      .insert([link])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data[0];
  },
};
