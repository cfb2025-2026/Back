import supabase from "../config/supabaseClient.ts";

export const AdminModel = {
    async getAll() {
        const { data, error } = await supabase.from("Admin").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(id: number) {
        const { data, error } = await supabase.from("Admin").select("*").eq("id", id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(admin: { name: string }) {
        const { data, error } = await supabase.from("Admin").insert([admin]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(id: number, admin: { name?: string }) {
        const { data, error } = await supabase.from("Admin").update(admin).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(id: number) {
        const { error } = await supabase.from("Admin").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { message: "Admin deleted" };
    },
};
