import supabase from "../config/supabaseClient.ts";

export const UserModel = {
    async getAll() {
        const { data, error } = await supabase.from("User").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: number) {
        const { data, error } = await supabase.from("User").select("*").eq("id", id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(user: { username: string; email: string; password: string; birthdate?: string; img_profile?: string; review_id?: number }) {
        const { data, error } = await supabase.from("User").insert([user]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: number, user: Partial<{ username: string; email: string; password: string; birthdate: string; img_profile: string; review_id: number }>) {
        const { data, error } = await supabase.from("User").update(user).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: number) {
        const { error } = await supabase.from("User").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    },
};
