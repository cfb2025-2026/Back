import { CartController } from "../controllers/CartsControllers.tsx";

export async function cartsRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/carts") return CartController.getAll(req);
    if (req.method === "POST" && path === "/api/carts") return CartController.create(req);
    if (req.method === "PUT" && path.match(/^\/api\/carts\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return CartController.update(req, id);
    }
    if (req.method === "DELETE" && path.match(/^\/api\/carts\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return CartController.delete(req, id);
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
