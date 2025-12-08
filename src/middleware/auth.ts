import supabase from "../config/supabaseClient";

export async function authMiddleware(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Missing token" }), { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Retourne l’utilisateur pour pouvoir l’injecter dans la requête
    return data.user;
}
