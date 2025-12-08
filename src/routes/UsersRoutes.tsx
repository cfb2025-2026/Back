import { UsersControllers } from "../controllers/UsersControllers";

// Wrapper CORS pour toutes les réponses
function withCors(response: Response) {
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey");
    headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    return new Response(response.body, { status: response.status, headers });
}

export async function usersRoutes(req: Request, path: string, user: any) {
    const method = req.method;
    const match = path.match(/^\/api\/users\/([^\/]+)$/);
    const id = match ? match[1] : undefined;

    // GET /api/users (admin only)
    if (method === "GET" && path === "/api/users") {
        if (!user || !user["isadmin"]) {
            return withCors(new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 }));
        }
        const response = await UsersControllers.getAll(req, user);
        return withCors(response);
    }

    // GET /api/users/:id (accessible à tous)
    if (method === "GET" && id) {
        if (!user) {
            return withCors(new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }));
        }
        const response = await UsersControllers.getById(req, id, user);
        return withCors(response);
    }

    // POST /api/users (création de compte, pas besoin d'être admin ni de token)
    if (method === "POST" && path === "/api/users") {
        const response = await UsersControllers.create(req);
        return withCors(response);
    }

    // PUT / DELETE avec ID (admin only)
    if (id && ["PUT", "DELETE"].includes(method)) {
        if (!user || !user["isadmin"]) {
            return withCors(new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 }));
        }

        if (method === "PUT") {
            const response = await UsersControllers.update(req, id, user);
            return withCors(response);
        }

        if (method === "DELETE") {
            const response = await UsersControllers.delete(req, id, user);
            return withCors(response);
        }
    }

    return withCors(new Response(JSON.stringify({ error: "Not found" }), { status: 404 }));
}
