import { SellerModel } from "../models/Seller.ts";

export const SellersControllers = {
    async getAll(req: Request) {
        try {
            const sellers = await SellerModel.getAll();
            return new Response(JSON.stringify(sellers), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async getById(req: Request, id: number) {
        try {
            const seller = await SellerModel.getById(id);
            return new Response(JSON.stringify(seller), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const seller = await SellerModel.create(body);
            return new Response(JSON.stringify(seller), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: number) {
        try {
            const body = await req.json();
            const seller = await SellerModel.update(id, body);
            return new Response(JSON.stringify(seller), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: number) {
        try {
            const result = await SellerModel.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
