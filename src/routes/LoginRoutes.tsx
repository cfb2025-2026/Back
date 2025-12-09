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

        // Génération du token
        const token = jwt.sign(
            {
                id: user.users_id,
                email: user.email,
                isadmin: !!user.isadmin,
                isseller: !!user.isseller
            },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        // Réponse formatée
        return new Response(JSON.stringify({
            message: "Login successful",
            token,
            isadmin: !!user.isadmin,
            isseller: !!user.isseller,
            user: {
                users_id: user.users_id,
                username: user.username,
                email: user.email,
                imgurl: user.imgurl || null,
                isadmin: !!user.isadmin,
                isseller: !!user.isseller
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
