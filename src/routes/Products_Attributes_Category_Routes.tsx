import { ProductAttributeCategoryController } from "../controllers/Product_Attribute_Category_Controllers";

export async function productAttributeCategoryRoutes(req: Request, path: string, user: any) {
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // POST /api/productattributecategory -> ajouter une catégorie d'attribut produit
    if (req.method === "POST" && path === "/api/productattributecategory") {
        // Exemple : limiter aux admins
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        return ProductAttributeCategoryController.create(req, user);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
}
