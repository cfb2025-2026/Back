import { Roles } from "../models/Roles.ts";

export const RolesControllers = {
    async getAll(req: Request) {
        try {
            const roles = await Roles.getAll();
            return new Response(JSON.stringify(roles), { headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();
            const role = await Roles.create(body);
            return new Response(JSON.stringify(role), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
