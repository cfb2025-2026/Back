import supabase from "../config/supabaseClient.tsx";

export const CartsModel = {
    async getAll() {
        const { data, error } = await supabase.from("Cart").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(cart: { product_id: number; user_id: number; product_quantity: number }) {
        const { data, error } = await supabase.from("Cart").insert([cart]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(carts_id: number, cart: Partial<{ product_id: number; user_id: number; product_quantity: number }>) {
        const { data, error } = await supabase.from("Cart").update(cart).eq("carts_id", carts_id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(carts_id: number) {
        const { error } = await supabase.from("Cart").delete().eq("carts_id", carts_id);
        if (error) throw new Error(error.message);
        return { message: "Cart deleted" };
    },
};
