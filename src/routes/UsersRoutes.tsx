import { UsersControllers } from "../controllers/UsersControllers";

export async function usersRoutes(req: Request, path: string, user: any) {
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const method = req.method;

    // GET /api/users (admin only)
    if (method === "GET" && path === "/api/users") {
        if (user.isAdmin !== true) {
            return new Response(JSON.stringify({ error: "Forbidden" }), {
                status: 403,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        const response = await UsersControllers.getAll(req, user);
        return new Response(JSON.stringify(response.body), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const match = path.match(/^\/api\/users\/([^\/]+)$/);
    const id = match ? match[1] : undefined;

    if (method === "GET" && id) {
        const response = await UsersControllers.getById(req, id, user);
        return new Response(JSON.stringify(response.body), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    // Admin required for PUT/DELETE/POST with ID
    if (id && (method === "PUT" || method === "DELETE" || method === "POST")) {
        if (user.isAdmin !== true) {
            return new Response(JSON.stringify({ error: "Forbidden" }), {
                status: 403,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }
    }

    // FIX CORS HERE: Wrap the response!
    if (method === "POST" && path === "/api/users") {
        const response = await UsersControllers.create(req);

        return new Response(JSON.stringify(response.body), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey"
            }
        });
    }

    if (method === "PUT" && id) {
        const response = await UsersControllers.update(req, id, user);

        return new Response(JSON.stringify(response.body), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    if (method === "DELETE" && id) {
        const response = await UsersControllers.delete(req, id, user);

        return new Response(JSON.stringify(response.body), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}
