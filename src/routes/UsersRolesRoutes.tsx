import { UsersRolesControllers } from "../controllers/UsersRolesControllers";

export async function userRolesRoutes(req: Request, path: string, user: any) {
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // POST /api/userroles -> créer un rôle utilisateur (admin uniquement)
    if (req.method === "POST" && path === "/api/userroles") {
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        return UsersRolesControllers.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
}
