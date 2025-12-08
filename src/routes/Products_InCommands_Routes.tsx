import { ProductInOrderController } from "../controllers/Product_InCommandsControllers.tsx";

export async function productInOrderRoutes(req: Request, path: string) {
  if (req.method === "POST" && path === "/api/productinorder")
    return ProductInOrderController.create(req);
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
