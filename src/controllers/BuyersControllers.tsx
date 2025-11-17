import { BuyerModel } from "../models/Buyer.tsx";

export const BuyersControllers = {
    async getAll(req: Request) {
        try {
            const buyers = await BuyerModel.getAll();
            return new Response(JSON.stringify(buyers), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async getById(req: Request, id: number) {
        try {
            const buyer = await BuyerModel.getById(id);
            return new Response(JSON.stringify(buyer), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const buyer = await BuyerModel.create(body);
            return new Response(JSON.stringify(buyer), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async update(req: Request, id: number) {
        try {
            const body = await req.json();
            const buyer = await BuyerModel.update(id, body);
            return new Response(JSON.stringify(buyer), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async delete(req: Request, id: number) {
        try {
            const result = await BuyerModel.delete(id);
            return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
