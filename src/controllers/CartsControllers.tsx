import { CartsModel } from "../models/Carts";

export const CartController = {
    async getAll(req: Request) {
        try {
            const carts = await CartsModel.getAll();
            return new Response(JSON.stringify(carts), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const cart = await CartsModel.create(body);
            return new Response(JSON.stringify(cart), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: string) {
        try {
            const body = await req.json();
            const cart = await CartsModel.update(id, body);
            return new Response(JSON.stringify(cart), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: string) {
        try {
            const result = await CartsModel.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
