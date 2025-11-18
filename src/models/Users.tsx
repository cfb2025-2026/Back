import supabase from "../config/supabaseClient";

export const UserModel = {
    async getAll() {
        const { data, error } = await supabase.from("Users").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("users_id", id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    async create(user: {
        username: string;
        email: string;
        password: string;
        birthdate?: string;
        imgurl?: string;
        advice_id?: string;
    }) {
        const { data, error } = await supabase
            .from("Users")
            .insert([user])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: string, user: Partial<{
        username: string;
        email: string;
        password: string;
        birthdate?: string;
        imgurl?: string;
        advice_id?: string;
        isadmin?: boolean;
        isseller?: boolean;
    }>) {
        const { data, error } = await supabase
            .from("Users")
            .update(user)
            .eq("users_id", id)
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: string) {
        const { error } = await supabase
            .from("Users")
            .delete()
            .eq("users_id", id);

        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    }
};
