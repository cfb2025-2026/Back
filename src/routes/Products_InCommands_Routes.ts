import { ProductInOrderController } from "../controllers/Product_InCommandsControllers.ts";

export async function productInOrderRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/productOrder") return ProductInOrderController.getAll(req);

    if (req.method === "POST" && path === "/api/productOrder") return ProductInOrderController.create(req);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
