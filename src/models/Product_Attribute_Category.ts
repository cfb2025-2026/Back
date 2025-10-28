import supabase from "../config/supabaseClient.ts";

export const ProductAttributeCategoryModel = {
    async getAll() {
        const { data, error } = await supabase.from("Product_Attribute_Category").select("*");
        if (error) throw new Error(error.message);
        return data;
    },
    async create(link: { product_id: number; attribute_id: number; category_id: number }) {
        const { data, error } = await supabase.from("Product_Attribute_Category").insert([link]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
