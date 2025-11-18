// src/models/User.ts
import supabase from "../config/supabaseClient";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const UserModel = {
    // Get all users
    async getAll() {
        const { data, error } = await supabase.from("Users").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    // Get user by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("users_id", id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    },

    // Create user with hashed password
    async create(user: {
        username: string;
        email: string;
        password: string;
        birthdate?: string;
        img_profile?: string;
        review_id?: number;
    }) {
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        const { data, error } = await supabase
            .from("Users")
            .insert([{ ...user, password: hashedPassword }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    // Update user (hash password if provided)
    async update(
        id: string,
        user: Partial<{
            username: string;
            email: string;
            password: string;
            birthdate: string;
            img_profile: string;
            review_id: number;
        }>
    ) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
        const { data, error } = await supabase
            .from("Users")
            .update(user)
            .eq("users_id", id)
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    },

    // Delete user
    async delete(id: string) {
        const { error } = await supabase.from("Users").delete().eq("users_id", id);
        if (error) throw new Error(error.message);
        return { message: "User deleted" };
    },
};
