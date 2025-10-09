import { BuyersControllers } from "../controllers/BuyersControllers.ts";

export async function buyersRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/buyers") return BuyersControllers.getAll(req);
    if (req.method === "GET" && path.match(/^\/api\/buyers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return BuyersControllers.getById(req, id);
    }
    if (req.method === "POST" && path === "/api/buyers") return BuyersControllers.create(req);
    if (req.method === "PUT" && path.match(/^\/api\/buyers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return BuyersControllers.update(req, id);
    }
    if (req.method === "DELETE" && path.match(/^\/api\/buyers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return BuyersControllers.delete(req, id);
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
