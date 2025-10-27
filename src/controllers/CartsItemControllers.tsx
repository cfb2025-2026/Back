import { CartItemModel } from "../models/CartItem.tsx";

export const CartItemController = {
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
