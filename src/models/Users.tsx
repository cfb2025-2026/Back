// src/models/Users.ts
import supabase from "../config/supabaseClient";

export const UserModel = {
  async getAll() {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(users_id: string) {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("users_id", users_id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return null;
    return data[0];
  },

  async create(user: {
    username: string;
    email: string;
    password: string;
    birthdate?: string;
    imgurl?: string;
    advice_id?: string | null;
    isadmin?: boolean;
    isseller?: boolean;
  }) {
    const { data, error } = await supabase
      .from("Users")
      .insert([user])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async update(users_id: string, user: Partial<any>) {
    const { data, error } = await supabase
      .from("Users")
      .update(user)
      .eq("users_id", users_id)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  async delete(users_id: string) {
    const { error } = await supabase
      .from("Users")
      .delete()
      .eq("users_id", users_id);
    if (error) throw new Error(error.message);
    return { message: "User deleted" };
  },
};
