import { CartItemModel } from "../models/CartItem.ts";

export const CartItemController = {
    async getAll(req: Request) {
        try {
            const orders = await CartItemModel.getAll();
            return new Response(JSON.stringify(orders), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const link = await CartItemModel.create(body);
            return new Response(JSON.stringify(link), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
