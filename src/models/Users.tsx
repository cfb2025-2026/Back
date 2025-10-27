import supabase from "../config/supabaseClient.ts";

export const UserModel = {
    async getAll() {
        const { data, error } = await supabase.from("User").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(users_id: number) {
        const { data, error } = await supabase.from("User").select("*").eq("users_id", users_id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(user: { username: string; email: string; password: string; birthdate?: string; img_profile?: string; advice_id?: number }) {
        const { data, error } = await supabase.from("User").insert([user]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(users_id: number, user: Partial<{ username: string; email: string; password: string; birthdate: string; img_profile: string; advice_id: number }>) {
        const { data, error } = await supabase.from("User").update(user).eq("users_id", users_id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(users_id: number) {
        const { error } = await supabase.from("User").delete().eq("users_id", users_id);
        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    },
};
