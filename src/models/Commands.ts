import supabase from "../config/supabaseClient.ts";

export const Commands = {
    async getAll() {
        const { data, error } = await supabase.from("Commands").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async getById(command_id: string) {
        const { data, error } = await supabase.from("Commands").select("*").eq("command_id", command_id).single();
        if (error) throw new Error(error.message);
        return data;
    },

    async create(command: { user_id: number; total_price: number; command_status?: string }) {
        const { data, error } = await supabase.from("Commands").insert([command]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async update(command_id: number, command: Partial<{ user_id: number; total_price: number; command_status: string }>) {
        const { data, error } = await supabase.from("Commands").update(command).eq("command_id", command_id).select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    async delete(command_id: number) {
        const { error } = await supabase.from("Commands").delete().eq("command_id", command_id);
        if (error) throw new Error(error.message);
        return { message: "Order deleted" };
    },
};
