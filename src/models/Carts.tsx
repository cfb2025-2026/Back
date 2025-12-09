import supabase from "../config/supabaseClient";

export const CartsModel = {
    async getAll() {
        const { data, error } = await supabase.from("Cart").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(cart_item_id: string) {
        const { data, error } = await supabase
            .from("Cart")
            .select("*")
            .eq("cart_item_id", cart_item_id)
            .single();
        if (error) return null;
        return data;
    },

    async getByUserId(users_id: string) {
        const { data, error } = await supabase
            .from("Cart")
            .select("*")
            .eq("users_id", users_id);
        if (error) throw new Error(error.message);
        return data;
    },

    async getByUserAndProduct(users_id: string, product_id: string) {
        const { data, error } = await supabase
            .from("Cart")
            .select("*")
            .eq("users_id", users_id)
            .eq("product_id", product_id)
            .single();
        if (error) return null; // pas de produit trouvé
        return data;
    },

    async create(item: { users_id: string; product_id: string; quantity: number }) {
        const { data, error } = await supabase.from("Cart").insert([item]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(cart_item_id: string, updates: Partial<{ quantity: number }>) {
        const { data, error } = await supabase
            .from("Cart")
            .update(updates)
            .eq("cart_item_id", cart_item_id)
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(cart_item_id: string) {
        const { data, error } = await supabase
            .from("Cart")
            .delete()
            .eq("cart_item_id", cart_item_id)
            .select();
        if (error) throw new Error(error.message);
        return { message: "Cart item deleted", deleted: data[0] };
    },
};
