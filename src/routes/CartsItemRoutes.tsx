import { CartItemController } from "../controllers/CartsItemControllers.tsx";

export async function cartItemRoutes(req: Request, path: string) {
  if (req.method === "POST" && path === "/api/cartitem")
    return CartItemController.create(req);
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
