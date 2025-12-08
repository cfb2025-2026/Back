import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

async function authMiddleware(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Missing token" }), { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // retourne l'objet user décodé
    } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
}
