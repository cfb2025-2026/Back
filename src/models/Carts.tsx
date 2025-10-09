import supabase from "../config/supabaseClient.ts";

export const CartsModel = {
    async getAll() {
        const { data, error } = await supabase.from("Cart").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(cart: { product_id: number; user_id: number; quantity: number }) {
        const { data, error } = await supabase.from("Cart").insert([cart]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: number, cart: Partial<{ product_id: number; user_id: number; quantity: number }>) {
        const { data, error } = await supabase.from("Cart").update(cart).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: number) {
        const { error } = await supabase.from("Cart").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { message: "Cart deleted" };
    },
};
