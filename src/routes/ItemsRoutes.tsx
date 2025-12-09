import { ItemsControllers } from "../controllers/ItemsControllers";

export async function itemsRoutes(req: Request, path: string, user: any) {
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // GET /api/items -> accessible à tous les utilisateurs connectés
    if (req.method === "GET" && path === "/api/items") {
        return ItemsControllers.getAll(req, user);
    }

    // POST /api/items -> création réservée aux admins
    if (req.method === "POST" && path === "/api/items") {
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        return ItemsControllers.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
}
