import { ProductAttributeCategoryController } from "../controllers/Product_Attribute_Category_Controllers.tsx";

export async function productAttributeCategoryRoutes(req: Request, path: string) {
    if (req.method === "GET" && path === "/api/productCat") return ProductAttributeCategoryController.getAll(req);
    if (req.method === "POST" && path === "/api/productCat") return ProductAttributeCategoryController.create(req);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
