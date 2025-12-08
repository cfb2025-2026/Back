import { UsersRolesModel } from "../models/UsersRoles";

export const UsersRolesControllers = {
    async create(req: Request, user: any) {
        try {
            // Vérification du rôle admin
            if (user.role !== "admin") {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
            }

            const body = await req.json();
            const link = await UsersRolesModel.create(body);
            return new Response(JSON.stringify(link), { status: 201, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    },
};
