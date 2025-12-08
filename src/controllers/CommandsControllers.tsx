import { Commands } from "../models/Commands";

export const CommandsControllers = {
    async getAll(req: Request, user: any) {
        try {
            let orders;

            if (user.role === "admin") {
                // Admin : récupère toutes les commandes
                orders = await Commands.getAll();
            } else {
                // Utilisateur normal : récupère uniquement ses commandes
                orders = await Commands.getByUserId(user.id);
            }

            return new Response(JSON.stringify(orders), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request, user: any) {
        try {
            const body = await req.json();
            // Associer automatiquement la commande à l'utilisateur connecté
            body.user_id = user.id;

            const order = await Commands.create(body);
            return new Response(JSON.stringify(order), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: number, user: any) {
        try {
            const order = await Commands.getById(id);
            if (!order) {
                return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            // Vérifie que l'utilisateur est propriétaire ou admin
            if (order.user_id !== user.id && user.role !== "admin") {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            const body = await req.json();
            const updatedOrder = await Commands.update(id, body);
            return new Response(JSON.stringify(updatedOrder), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: number, user: any) {
        try {
            const order = await Commands.getById(id);
            if (!order) {
                return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            // Vérifie que l'utilisateur est propriétaire ou admin
            if (order.user_id !== user.id && user.role !== "admin") {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            const result = await Commands.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
