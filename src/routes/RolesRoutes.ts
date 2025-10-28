import { RolesControllers } from "../controllers/RolesControllers.ts";

export async function rolesRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/roles") return RolesControllers.getAll(req);
    if (req.method === "POST" && path === "/api/roles") return RolesControllers.create(req);

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
