import { UsersControllers } from "../controllers/UsersControllers";

export async function usersRoutes(req: Request, path: string, user: any) {
    const method = req.method;
    const match = path.match(/^\/api\/users\/([^\/]+)$/);
    const id = match ? match[1] : undefined;

    // GET /api/users (admin only)
    if (method === "GET" && path === "/api/users") {
        if (!user || user["isAdmin?"] !== true) {
            return new Response(JSON.stringify({ error: "Forbidden" }), {
                status: 403,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }
        return await UsersControllers.getAll(req, user);
    }

    // GET /api/users/:id (accessible à tous)
    if (method === "GET" && id) {
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
        }
        return await UsersControllers.getById(req, id, user);
    }

    // POST /api/users (création de compte, pas besoin d'être admin)
    if (method === "POST" && path === "/api/users") {
        return await UsersControllers.create(req);
    }

    // PUT / DELETE / POST with ID (admin only)
    if (id && ["PUT", "DELETE"].includes(method)) {
        if (!user || user["isAdmin?"] !== true) {
            return new Response(JSON.stringify({ error: "Forbidden" }), {
                status: 403,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
        }

        if (method === "PUT") return await UsersControllers.update(req, id, user);
        if (method === "DELETE") return await UsersControllers.delete(req, id, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
}
