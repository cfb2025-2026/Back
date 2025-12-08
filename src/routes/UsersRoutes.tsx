import { UsersControllers } from "../controllers/UsersControllers";

export async function usersRoutes(req: Request, path: string, user: any) {
    // Vérifie l'authentification pour toutes les routes
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const method = req.method;

    // GET /api/users -> tous les utilisateurs (admin only)
    if (method === "GET" && path === "/api/users") {
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
        return UsersControllers.getAll(req, user);
    }

    // Vérifie si l'URL est /api/users/:id
    const match = path.match(/^\/api\/users\/([^\/]+)$/);
    const id = match ? match[1] : undefined;

    if (method === "GET" && id) {
        // GET /api/users/:id -> accessible à tous
        return UsersControllers.getById(req, id, user);
    }

    if (id && (method === "PUT" || method === "DELETE" || method === "POST")) {
        // POST/PUT/DELETE sur un utilisateur -> admin only
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
    }

    if (method === "POST" && path === "/api/users") {
        return UsersControllers.create(req, user);
    }

    if (method === "PUT" && id) {
        return UsersControllers.update(req, id, user);
    }

    if (method === "DELETE" && id) {
        return UsersControllers.delete(req, id, user);
    }

    // Route non trouvée
    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
    });
}
