import bcrypt from "bcrypt";
import supabase from "./config/supabaseClient";

const SALT_ROUNDS = 10;

async function hashPlainPasswords() {
    // 1️⃣ Fetch all users
    const { data: users, error } = await supabase.from("Users").select("*");
    if (error) throw new Error(error.message);
    if (!users) return;

    for (const user of users) {
        const password: string = user.password;

        // Skip if already hashed
        if (password.startsWith("$2a$") || password.startsWith("$2b$")) continue;

        // Hash password
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);

        // Update the user in DB using users_id
        const { error: updateError } = await supabase
            .from("Users")
            .update({ password: hashed })
            .eq("users_id", user.users_id);

        if (updateError) console.error(
            `Failed to hash password for user ${user.users_id}:`,
            updateError
        );
        else console.log(`Hashed password for user ${user.users_id}`);
    }

    console.log("✅ All passwords hashed.");
}

// Run script
hashPlainPasswords().catch(console.error);
