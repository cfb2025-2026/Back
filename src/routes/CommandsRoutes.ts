import { CommandsControllers } from "../controllers/CommandsControllers.ts";

export async function commandsRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/orders") return CommandsControllers.getAll(req);
    if (req.method === "GET" && path.match(/^\/api\/orders\/[0-9a-fA-F-]+$/)) {
        const id = path.split("/").pop() as string;
        return CommandsControllers.getById(req, id);
    }
    if (req.method === "POST" && path === "/api/orders") return CommandsControllers.create(req);
    if (req.method === "PUT" && path.match(/^\/api\/orders\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return CommandsControllers.update(req, id);
    }
    if (req.method === "DELETE" && path.match(/^\/api\/orders\/\d+$/)) {
        const id = Number(path.split("/").pop());
        return CommandsControllers.delete(req, id);
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
