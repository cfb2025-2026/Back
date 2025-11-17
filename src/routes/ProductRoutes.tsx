import { ProductModel } from "../models/Product.tsx";

export async function productsRoutes(req: Request, path: string) {
    const url = new URL(req.url);
    const method = req.method;
    const cleanPath = path.replace(/\/+$/, ""); // retire les slashes finaux

    // GET /api/products
    if (method === "GET" && cleanPath === "/api/products") {
        try {
            const produits = await ProductModel.getAll();
            return Response.json(produits);
        } catch (e: any) {
            return new Response(`Error: ${e.message}`, { status: 500 });
        }
    }

    // GET /api/products/:id
    if (method === "GET" && cleanPath.startsWith("/api/products/")) {
        const parts = cleanPath.split("/");
        const id = parts[parts.length - 1];
        if (!id) return new Response("Not found", { status: 404 });

        try {
            const produit = await ProductModel.getById(id);
            if (!produit) return new Response("Not found", { status: 404 });
            return Response.json(produit);
        } catch (e: any) {
            return new Response(`Error: ${e.message}`, { status: 500 });
        }
    }

    // POST /api/products
    if (method === "POST" && cleanPath === "/api/products") {
        try {
            const body = await req.json();
            const produit = await ProductModel.create(body);
            return Response.json(produit, { status: 201 });
        } catch (e: any) {
            return new Response(`Error: ${e.message}`, { status: 500 });
        }
    }

    // PUT /api/products/:id
    if (method === "PUT" && cleanPath.startsWith("/api/products/")) {
        const parts = cleanPath.split("/");
        const id = parts[parts.length - 1];
        if (!id) return new Response("Not found", { status: 404 });

        try {
            const body = await req.json();
            const updated = await ProductModel.update(id, body);
            return Response.json(updated);
        } catch (e: any) {
            return new Response(`Error: ${e.message}`, { status: 500 });
        }
    }

    // DELETE /api/products/:id
    if (method === "DELETE" && cleanPath.startsWith("/api/products/")) {
        const parts = cleanPath.split("/");
        const id = parts[parts.length - 1];
        if (!id) return new Response("Not found", { status: 404 });

        try {
            const deleted = await ProductModel.delete(id);
            return Response.json(deleted);
        } catch (e: any) {
            return new Response(`Error: ${e.message}`, { status: 500 });
        }
    }

    // Sinon route non trouvée
    return new Response("Not found", { status: 404 });
}
