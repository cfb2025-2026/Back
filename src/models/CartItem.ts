import supabase from "../config/supabaseClient.ts";

export const CartItemModel = {
    async getAll() {
        const { data, error } = await supabase.from("Product_InCommands").select("*");
        if (error) throw new Error(error.message);
        return data;
    },
    async create(link: { cart_id: number; item_id: number }) {
        const { data, error } = await supabase.from("CartItem").insert([link]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
