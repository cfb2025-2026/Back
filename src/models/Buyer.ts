import supabase from "../config/supabaseClient.ts";

export const BuyerModel = {
    async getAll() {
        const { data, error } = await supabase.from("Buyer").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: number) {
        const { data, error } = await supabase.from("Buyer").select("*").eq("id", id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(buyer: { name: string }) {
        const { data, error } = await supabase.from("Buyer").insert([buyer]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: number, buyer: { name?: string }) {
        const { data, error } = await supabase.from("Buyer").update(buyer).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: number) {
        const { error } = await supabase.from("Buyer").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { message: "Buyer deleted" };
    },
};
