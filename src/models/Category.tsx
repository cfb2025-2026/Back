import supabase from "../config/supabaseClient.tsx";

export const CategoryModel = {
    async getAll() {
        const { data, error } = await supabase.from("Category").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(category: { name: string }) {
        const { data, error } = await supabase.from("Category").insert([category]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
