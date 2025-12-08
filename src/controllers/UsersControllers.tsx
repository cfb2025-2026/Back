import { UserModel } from "../models/Users";
import bcrypt from "bcrypt";

export const UsersControllers = {
    async getAll(req: Request, authUser: any) {
        try {
            // Optionnel : vérifier si user est admin
            // if (!authUser.role || authUser.role !== "admin") {
            //     return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
            // }

            const users = await UserModel.getAll();
            return new Response(JSON.stringify(users), { status: 200 });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500 });
        }
    },

    async getById(req: Request, id: string, authUser: any) {
        try {
            const user = await UserModel.getById(id);
            if (!user) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

            // Optionnel : un utilisateur peut voir seulement son propre profil ou si admin
            // if (authUser.id !== id && authUser.role !== "admin") {
            //     return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
            // }

            return new Response(JSON.stringify(user), { status: 200 });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500 });
        }
    },

    async create(req: Request, authUser: any) {
        try {
            // Vérification du rôle admin
            if (authUser.role !== "admin") {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
            }

            const body = await req.json();

            // Hash password
            if (!body.password) {
                return new Response(JSON.stringify({ error: "Password required" }), { status: 400 });
            }
            body.password = await bcrypt.hash(body.password, 10);

            const user = await UserModel.create(body);
            return new Response(JSON.stringify(user), { status: 201 });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500 });
        }
    },

    async update(req: Request, id: string, authUser: any) {
        try {
            // Vérification du rôle admin ou mise à jour de son propre compte
            if (authUser.role !== "admin" && authUser.id !== id) {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
            }

            const body = await req.json();

            // Hash password seulement si changé
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 10);
            }

            const user = await UserModel.update(id, body);
            return new Response(JSON.stringify(user), { status: 200 });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500 });
        }
    },

    async delete(req: Request, id: string, authUser: any) {
        try {
            // Vérification du rôle admin
            if (authUser.role !== "admin") {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
            }

            const deleted = await UserModel.delete(id);
            return new Response(JSON.stringify(deleted), { status: 200 });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500 });
        }
    }
};
