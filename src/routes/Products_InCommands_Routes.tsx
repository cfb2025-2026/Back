import { ProductInOrderController } from "../controllers/Product_InCommandsControllers";

export async function productInOrderRoutes(req: Request, path: string, user: any) {
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // POST /api/productinorder -> ajouter un produit à une commande
    if (req.method === "POST" && path === "/api/productinorder") {
        // Ici, tu peux soit limiter aux admins, soit vérifier que l'utilisateur est propriétaire de la commande
        // Exemple : uniquement admin
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        return ProductInOrderController.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
}
