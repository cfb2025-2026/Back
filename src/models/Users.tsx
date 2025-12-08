// src/models/Users.ts
import supabase from "../config/supabaseClient";

export const UserModel = {
    async getAll() {
        const { data, error } = await supabase.from("Users").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: string) {
        const { data, error } = await supabase.from("Users").select("*").eq("id", id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async getByEmail(email: string) {
        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("email", email);
        if (error) throw new Error(error.message);
        if (!data || data.length === 0) return null; // pas trouvé
        return data[0]; // on prend le premier (il ne doit y en avoir qu'un seul)
    },

    async create(user: { username: string; email: string; password: string; birthdate?: string; imgurl?: string; advice_id?: string }) {
        const { data, error } = await supabase.from("Users").insert([user]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: string, user: Partial<any>) {
        const { data, error } = await supabase.from("Users").update(user).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: string) {
        const { error } = await supabase.from("Users").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    }
};
