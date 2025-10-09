import supabase from "../config/supabaseClient.ts";

export const UsersAdviceModel = {
    async getAll() {
        const { data, error } = await supabase.from("UsersAdvice").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(review: { content: string }) {
        const { data, error } = await supabase.from("UsersAdvice").insert([review]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
