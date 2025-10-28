import supabase from "../config/supabaseClient.tsx";

export const ProductInCommandsModel = {
    async getAll() {
        const { data, error } = await supabase.from("Product_InCommands").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(link: { product_id: number; commands_id: number }) {
        const { data, error } = await supabase.from("Product_InCommands").insert([link]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
