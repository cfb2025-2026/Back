import supabase from "../config/supabaseClient.ts";

export const UsersRolesModel = {
    async create(userRole: { user_id: number; role_id: number }) {
        const { data, error } = await supabase.from("UserRole").insert([userRole]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
