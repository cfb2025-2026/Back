import { ProductModel } from "../models/Product.ts";

export async function productsRoutes(req: Request, path: string) {
    const url = new URL(req.url);

    // GET /api/products
    if (req.method === "GET" && path === "/api/products") {
        const produits = await ProductModel.getAll();
        return Response.json(produits);
    }

    // GET /api/products/:id
    if (req.method === "GET" && path.match(/^\/api\/products\/\d+$/)) {
        const id = Number(path.split("/").pop());
        const produit = await ProductModel.getById(id);
        return Response.json(produit);
    }

    // POST /api/products
    if (req.method === "POST" && path === "/api/products") {
        const body = await req.json();
        const produit = await ProductModel.create(body);
        return Response.json(produit, { status: 201 });
    }

    // PUT /api/products/:id
    if (req.method === "PUT" && path.match(/^\/api\/products\/\d+$/)) {
        const id = Number(path.split("/").pop());
        const body = await req.json();
        const updated = await ProductModel.update(id, body);
        return Response.json(updated);
    }

    // DELETE /api/products/:id
    if (req.method === "DELETE" && path.match(/^\/api\/products\/\d+$/)) {
        const id = Number(path.split("/").pop());
        const deleted = await ProductModel.delete(id);
        return Response.json(deleted);
    }

    // Sinon route non trouvée
    return new Response("Not found", { status: 404 });
}
