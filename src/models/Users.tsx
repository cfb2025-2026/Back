import supabase from "../config/supabaseClient.tsx";

export const UserModel = {
    async getAll() {
        const { data, error } = await supabase.from("Users").select("*");
        if (error) throw new Error(error.message);

        // Remplacer le mot de passe par un hash fictif ou null
        return data.map(user => ({
            ...user,
            password: '********' // ou null
        }));
    },

    async getById(users_id: string) {
        const { data, error } = await supabase.from("Users").select("*").eq("users_id", users_id).single();
        if (error) throw new Error(error.message);

        return {
            ...data,
            password: '********' // ou null
        };
    },

    async create(user: { username: string; email: string; password: string; birthdate?: string; img_profile?: string; advice_id?: number; isadmin?: boolean; isseller?: boolean }) {
        const { data, error } = await supabase.from("Users").insert([user]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(users_id: string, user: Partial<{ username: string; email: string; password: string; birthdate: string; img_profile: string; advice_id: number }>) {
        const { data, error } = await supabase.from("Users").update(user).eq("users_id", users_id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(users_id: string) {
        const { error } = await supabase.from("Users").delete().eq("users_id", users_id);
        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    },
};
