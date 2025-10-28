import { UsersRolesModel } from "../models/UsersRoles.ts";

export const UsersRolesControllers = {
    async create(req: Request) {
        try {
            const body = await req.json();
            const link = await UsersRolesModel.create(body);
            return new Response(JSON.stringify(link), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
