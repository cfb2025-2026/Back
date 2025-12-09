import { CartController } from "../controllers/CartsControllers";

export async function cartsRoutes(req: Request, path: string, user: any) {
  const cleanPath = path.replace(/\/+$/, ""); // remove trailing slashes
  const method = req.method;

  // Vérifier que l'utilisateur est authentifié pour TOUTES les routes
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // GET /api/carts -> récupérer tous les paniers (admin ou les siens)
  if (method === "GET" && cleanPath === "/api/carts") {
    return CartController.getAll(req, user);
  }

  // GET /api/carts/:id -> récupérer un panier par ID
  if (method === "GET" && cleanPath.startsWith("/api/carts/")) {
    const id = cleanPath.split("/").pop();
    if (!id) return new Response("Invalid ID", { status: 400 });
    return CartController.getById(req, id, user);
  }

  // POST /api/carts -> créer un panier
  if (method === "POST" && cleanPath === "/api/carts") {
    return CartController.create(req, user);
  }

  // PUT /api/carts/:id -> mettre à jour un panier
  if (method === "PUT" && cleanPath.startsWith("/api/carts/")) {
    const id = cleanPath.split("/").pop();
    if (!id) return new Response("Invalid ID", { status: 400 });
    return CartController.update(req, id, user);
  }

  // DELETE /api/carts/:id -> supprimer un panier
  if (method === "DELETE" && cleanPath.startsWith("/api/carts/")) {
    const id = cleanPath.split("/").pop();
    if (!id) return new Response("Invalid ID", { status: 400 });
    return CartController.delete(req, id, user);
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
