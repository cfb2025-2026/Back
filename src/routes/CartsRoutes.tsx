import { CartController } from "../controllers/CartsControllers";

export async function cartsRoutes(req: Request, path: string) {
    const cleanPath = path.replace(/\/+$/, ""); // remove trailing slashes
    const method = req.method;

    // GET /api/carts
    if (method === "GET" && cleanPath === "/api/carts") {
        return CartController.getAll(req);
    }

    // GET /api/carts/:id
    if (method === "GET" && cleanPath.startsWith("/api/carts/")) {
        const id = cleanPath.split("/").pop();
        if (!id) return new Response("Invalid ID", { status: 400 });
        return CartController.getById(req, id);
    }

    // POST /api/carts
    if (method === "POST" && cleanPath === "/api/carts") {
        return CartController.create(req);
    }

    // PUT /api/carts/:id
    if (method === "PUT" && cleanPath.startsWith("/api/carts/")) {
        const id = cleanPath.split("/").pop();
        if (!id) return new Response("Invalid ID", { status: 400 });
        return CartController.update(req, id);
    }

    // DELETE /api/carts/:id
    if (method === "DELETE" && cleanPath.startsWith("/api/carts/")) {
        const id = cleanPath.split("/").pop();
        if (!id) return new Response("Invalid ID", { status: 400 });
        return CartController.delete(req, id);
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
