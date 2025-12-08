import { UserModel } from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";


export async function loginRoute(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
        }

        const user = await UserModel.getByEmail(email);
        if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

        // Générer un token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
