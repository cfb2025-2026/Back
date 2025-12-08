import { CartItemController } from "../controllers/CartsItemControllers";

export async function cartItemRoutes(req: Request, path: string, user: any) {
    // Vérification de l'utilisateur connecté
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // POST /api/cartitem -> créer un item dans le panier
    if (req.method === "POST" && path === "/api/cartitem") {
        return CartItemController.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
    });
}
