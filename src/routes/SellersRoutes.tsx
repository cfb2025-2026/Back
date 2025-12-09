import { SellersControllers } from "../controllers/SellersControllers";

export async function sellersRoutes(req: Request, path: string, user: any) {
    // Vérifie l'authentification
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const method = req.method;

    // GET /api/sellers -> accessible à tous les utilisateurs connectés
    if (method === "GET" && path === "/api/sellers") {
        return SellersControllers.getAll(req, user);
    }

    // Vérifie si l'URL est /api/sellers/:id
    const match = path.match(/^\/api\/sellers\/(\d+)$/);
    const id = match ? Number(match[1]) : undefined;

    if (method === "GET" && id !== undefined) {
        return SellersControllers.getById(req, id, user);
    }

    // Les actions POST/PUT/DELETE sont réservées aux admins
    if (["POST", "PUT", "DELETE"].includes(method)) {
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
    }

    if (method === "POST" && path === "/api/sellers") {
        return SellersControllers.create(req, user);
    }

    if (method === "PUT" && id !== undefined) {
        return SellersControllers.update(req, id, user);
    }

    if (method === "DELETE" && id !== undefined) {
        return SellersControllers.delete(req, id, user);
    }

    // Route non trouvée
    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
    });
}
