import supabase from "../config/supabaseClient";

export const CartsModel = {
    async getAll() {
        const { data, error } = await supabase.from("Carts").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getByUserId(user_id: string) {
        const { data, error } = await supabase.from("Carts").select("*").eq("users_id", user_id);
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: string) {
        const { data, error } = await supabase.from("Carts").select("*").eq("carts_id", id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(cart: { product_id: string; users_id: string; product_quantity: number }) {
        const { data, error } = await supabase.from("Carts").insert([cart]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: string, cart: Partial<{ product_id: string; user_id: string; quantity: number }>) {
        const { data, error } = await supabase.from("Carts").update(cart).eq("carts_id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: string) {
        const { error } = await supabase.from("Carts").delete().eq("carts_id", id);
        if (error) throw new Error(error.message);
        return { message: "Cart deleted" };
    },
};
