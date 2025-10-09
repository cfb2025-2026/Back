import { UsersRolesControllers } from "../controllers/UsersRolesControllers.ts";

export async function userRolesRoutes(req: Request, path: string) {
    if (req.method === "POST" && path === "/api/userroles") return UsersRolesControllers.create(req);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
