import { CartItemModel } from "../models/CartItem";

export const CartItemController = {
    async create(req: Request, user: any) {
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        try {
            const body = await req.json();

            // Exemple : lier automatiquement l'item au user_id
            body.user_id = user.id;

            const link = await CartItemModel.create(body);
            return new Response(JSON.stringify(link), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    },
};
