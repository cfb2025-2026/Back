import supabase from "../config/supabaseClient.ts";

export const AttributeModel = {
    async getAll() {
        const { data, error } = await supabase.from("Attribute").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    async create(attribute: { attribute_name: string }) {
        const { data, error } = await supabase.from("Attribute").insert([attribute]).select();
        if (error) throw new Error(error.message);
        return data[0];
    },
};
