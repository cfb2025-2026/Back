import { CartsModel } from "../models/Carts";

export const CartController = {
    async getAll(req: Request, user: any) {
        try {
            // Si admin, récupère tous les paniers
            if (user.isAdmin === true) {
                const carts = await CartsModel.getAll();
                return new Response(JSON.stringify(carts), { headers: { "Content-Type": "application/json" } });
            }

            // Sinon récupère uniquement les paniers de l'utilisateur
            const carts = await CartsModel.getByUserId(user.id);
            return new Response(JSON.stringify(carts), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async getById(req: Request, id: string, user: any) {
        try {
            const cart = await CartsModel.getById(id);
            if (!cart) {
                return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            // Vérifie admin OU propriétaire
            if (cart.users_id !== user.id && user.isAdmin !== true) {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            return new Response(JSON.stringify(cart), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request, user: any) {
        try {
            const body = await req.json();

            // Attribuer automatiquement le panier au user connecté
            body.users_id = user.id;

            const cart = await CartsModel.create(body);
            return new Response(JSON.stringify(cart), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: string, user: any) {
        try {
            const cart = await CartsModel.getById(id);
            if (!cart) {
                return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            // Admin OU propriétaire
            if (cart.users_id !== user.id && user.isAdmin !== true) {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            const body = await req.json();
            const updatedCart = await CartsModel.update(id, body);
            return new Response(JSON.stringify(updatedCart), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: string, user: any) {
        try {
            const cart = await CartsModel.getById(id);
            if (!cart) {
                return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            // Admin OU propriétaire
            if (cart.users_id !== user.id && user.isAdmin !== true) {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            const result = await CartsModel.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
