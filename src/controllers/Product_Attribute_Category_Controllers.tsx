import { ProductAttributeCategoryModel } from "../models/Product_Attribute_Category.tsx";


export const ProductAttributeCategoryController = {
    async getAll(req: Request) {
        try {
            const orders = await ProductAttributeCategoryModel.getAll();
            return new Response(JSON.stringify(orders), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const link = await ProductAttributeCategoryModel.create(body);
            return new Response(JSON.stringify(link), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
