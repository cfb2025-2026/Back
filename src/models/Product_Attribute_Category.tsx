import supabase from "../config/supabaseClient.ts";

export const ProductAttributeCategoryModel = {
    async create(link: { product_id: number; attribute_id: number; category_id: number }) {
        const { data, error } = await supabase.from("ProductAttributeCategory").insert([link]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
