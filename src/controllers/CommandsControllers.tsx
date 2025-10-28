import { Commands } from "../models/Commands.tsx";

export const CommandsControllers = {
    async getAll(req: Request) {
        try {
            const orders = await Commands.getAll();
            return new Response(JSON.stringify(orders), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async getById(req: Request, id: string) {
        try {
            const user = await Commands.getById(id);
            return new Response(JSON.stringify(user), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const order = await Commands.create(body);
            return new Response(JSON.stringify(order), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: number) {
        try {
            const body = await req.json();
            const order = await Commands.update(id, body);
            return new Response(JSON.stringify(order), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: number) {
        try {
            const result = await Commands.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
