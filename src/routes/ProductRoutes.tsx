import { ProductController } from "../controllers/ProductControllers.tsx";

export async function ProductsRoutes(req: Request, path: string) {
  if (req.method === "GET" && path === "/api/products")
    return ProductController.getAll(req);

  if (req.method === "GET" && path.match(/^\/api\/products\/[0-9a-fA-F-]+\/images$/)) {
    const segments = path.split("/"); // ["", "api", "products", ":id", "images"]
    const id = segments[3];

    if (!id) {
      return new Response(JSON.stringify({ error: "Product id manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return ProductController.getImages(req, id);
  }

  if (req.method === "GET" && path.match(/^\/api\/products\/[0-9a-fA-F-]+$/)) {
    const id = path.split("/").pop() as string;
    return ProductController.getById(req, id);
  }

  if (req.method === "POST" && path === "/api/products")
    return ProductController.create(req);
  if (req.method === "PUT" && path.match(/^\/api\/products\/\d+$/)) {
    const id = String(path.split("/").pop());
    return ProductController.update(req, id);
  }
  if (req.method === "DELETE" && path.match(/^\/api\/products\/\d+$/)) {
    const id = String(path.split("/").pop());
    return ProductController.delete(req, id);
  }
   if (req.method === "GET" && path === "/api/products/filter") {
    return ProductController.getFiltered(req);
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
