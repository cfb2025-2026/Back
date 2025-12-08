import { BuyerModel } from "../models/Buyer";

export const BuyersControllers = {
    async getAll(req: Request, user: any) {
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        try {
            const buyers = await BuyerModel.getAll();
            return new Response(JSON.stringify(buyers), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },

    async getById(req: Request, id: number, user: any) {
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        try {
            const buyer = await BuyerModel.getById(id);
            if (!buyer) {
                return new Response(JSON.stringify({ error: "Buyer not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
            return new Response(JSON.stringify(buyer), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },

    async create(req: Request, user: any) {
        if (!user || user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        try {
            const body = await req.json();
            const buyer = await BuyerModel.create(body);
            return new Response(JSON.stringify(buyer), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },

    async update(req: Request, id: number, user: any) {
        if (!user || user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        try {
            const body = await req.json();
            const buyer = await BuyerModel.update(id, body);
            return new Response(JSON.stringify(buyer), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },

    async delete(req: Request, id: number, user: any) {
        if (!user || user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        try {
            const result = await BuyerModel.delete(id);
            return new Response(JSON.stringify(result), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },
};
