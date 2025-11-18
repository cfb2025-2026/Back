import { ProductAttributeCategoryController } from "../controllers/Product_Attribute_Category_Controllers";

export async function productAttributeCategoryRoutes(req: Request, path: string) {
    if (req.method === "POST" && path === "/api/productattributecategory") return ProductAttributeCategoryController.create(req);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
}
