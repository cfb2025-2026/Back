import supabase from "../config/supabaseClient.ts";

export const ProductModel = {
    async getAll() {
        const { data, error } = await supabase.from("Product").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from("Product")
            .select("*")
            .eq("product_id", id) // <-- mettre le vrai nom de colonne ici
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    async create(product: { name: string; price: number; img_url?: string; seller_id?: number; review_id?: number }) {
        const { data, error } = await supabase.from("Product").insert([product]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: string, product: Partial<{ name: string; price: number; img_url: string; seller_id: number; review_id: number }>) {
        const { data, error } = await supabase.from("Product").update(product).eq("product_id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: string) {
        const { error } = await supabase.from("Product").delete().eq("product_id", id);
        if (error) throw new Error(error.message);
        return { message: "Product deleted" };
    },
};
