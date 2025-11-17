import { SellersControllers } from "../controllers/SellersControllers.tsx";

export async function sellersRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/sellers") return SellersControllers.getAll(req);
    if (req.method === "GET" && path.match(/^\/api\/sellers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return SellersControllers.getById(req, id);
    }
    if (req.method === "POST" && path === "/api/sellers") return SellersControllers.create(req);
    if (req.method === "PUT" && path.match(/^\/api\/sellers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return SellersControllers.update(req, id);
    }
    if (req.method === "DELETE" && path.match(/^\/api\/sellers\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return SellersControllers.delete(req, id);
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
