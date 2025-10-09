import { ItemsControllers } from "../controllers/ItemsControllers.ts";

export async function itemsRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/items") return ItemsControllers.getAll(req);
    if (req.method === "POST" && path === "/api/items") return ItemsControllers.create(req);

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
