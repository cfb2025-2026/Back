import { CartController } from "../controllers/CartsControllers";

export async function cartsRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/carts") return CartController.getAll(req);
    if (req.method === "POST" && path === "/api/carts") return CartController.create(req);

    if (req.method === "PUT" && path.startsWith("/api/carts/")) {
        const id = path.split("/").pop();
        if (!id) return new Response("Invalid ID", { status: 400 });
        return CartController.update(req, id);
    }

    if (req.method === "DELETE" && path.startsWith("/api/carts/")) {
        const id = path.split("/").pop();
        if (!id) return new Response("Invalid ID", { status: 400 });
        return CartController.delete(req, id);
    }

    return new Response(
        JSON.stringify({ error: "Not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
    );
}
