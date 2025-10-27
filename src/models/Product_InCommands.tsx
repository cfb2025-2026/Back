import supabase from "../config/supabaseClient.tsx";

export const ProductInCommandsModel = {
    async create(link: { product_id: number; commands_id: number }) {
        const { data, error } = await supabase.from("ProductInCommand").insert([link]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
