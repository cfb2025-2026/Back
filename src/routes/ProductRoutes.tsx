import { ProductModel } from "../models/Product";

export async function productsRoutes(req: Request, path: string, user: any) {
    const method = req.method;
    const cleanPath = path.replace(/\/+$/, "");
    const parts = cleanPath.split("/");
    const id = parts.length > 3 ? parts[3] : undefined;

    try {
        // GET /api/products -> accessible à tous
        if (method === "GET" && cleanPath === "/api/products") {
            const produits = await ProductModel.getAll();
            return Response.json(produits);
        }

        // GET /api/products/:id -> accessible à tous
        if (method === "GET" && id) {
            const produit = await ProductModel.getById(id);
            if (!produit) return new Response("Not found", { status: 404 });
            return Response.json(produit);
        }

        // Vérifie l'authentification pour les routes admin
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Vérifie que l'utilisateur est admin pour POST/PUT/DELETE
        if (user.isadmin !== true) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        // POST /api/products
        if (method === "POST" && cleanPath === "/api/products") {
            const body = await req.json();
            const produit = await ProductModel.create(body);
            return Response.json(produit, { status: 201 });
        }

        // PUT /api/products/:id
        if (method === "PUT" && id) {
            const body = await req.json();
            const updated = await ProductModel.update(id, body);
            return Response.json(updated);
        }

        // DELETE /api/products/:id
        if (method === "DELETE" && id) {
            const deleted = await ProductModel.delete(id);
            return Response.json(deleted);
        }

        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    } catch (e: any) {
        console.error("❌ Product route error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
