import { ProductController } from "../controllers/ProductControllers.ts";

export async function ProductsRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/products") return ProductController.getAll(req);
    if (req.method === "GET" && path.match(/^\/api\/products\/[0-9a-fA-F-]+$/)) {
        const id = path.split("/").pop() as string;
        return ProductController.getById(req, id);
    }
    if (req.method === "POST" && path === "/api/products") return ProductController.create(req);
    if (req.method === "PUT" && path.match(/^\/api\/products\/\d+$/)) {
        const id = String(path.split("/").pop());
        return ProductController.update(req, id);
    }
    if (req.method === "DELETE" && path.match(/^\/api\/products\/\d+$/)) {
        const id = String(path.split("/").pop());
        return ProductController.delete(req, id);
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}