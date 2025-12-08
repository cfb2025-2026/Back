import { BuyersControllers } from "../controllers/BuyersControllers";

export async function buyersRoutes(req: Request, path: string, user: any) {
    // Vérifie que l'utilisateur est connecté pour les routes protégées
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const method = req.method;
    const cleanPath = path.replace(/\/+$/, "");
    const id = cleanPath.match(/^\/api\/buyers\/(\d+)$/)?.[1];

    try {
        // GET /api/buyers -> accessible à tous
        if (method === "GET" && cleanPath === "/api/buyers") {
            return BuyersControllers.getAll(req, user);
        }

        // GET /api/buyers/:id -> accessible à tous
        if (method === "GET" && id) {
            return BuyersControllers.getById(req, Number(id), user);
        }

        // Vérifie que l'utilisateur est admin pour les actions sensibles
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }

        // POST /api/buyers
        if (method === "POST" && cleanPath === "/api/buyers") {
            return BuyersControllers.create(req, user);
        }

        // PUT /api/buyers/:id
        if (method === "PUT" && id) {
            return BuyersControllers.update(req, Number(id), user);
        }

        // DELETE /api/buyers/:id
        if (method === "DELETE" && id) {
            return BuyersControllers.delete(req, Number(id), user);
        }

        return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    } catch (e: any) {
        console.error("❌ Buyers route error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
