import { RolesControllers } from "../controllers/RolesControllers";

export async function rolesRoutes(req: Request, path: string, user: any) {
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // GET /api/roles -> récupérer tous les rôles
    if (req.method === "GET" && path === "/api/roles") {
        return RolesControllers.getAll(req, user);
    }

    // POST /api/roles -> créer un rôle (admin uniquement)
    if (req.method === "POST" && path === "/api/roles") {
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        return RolesControllers.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
}
