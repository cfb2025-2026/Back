import { Roles } from "../models/Roles";

export const RolesControllers = {
  async getAll(req: Request, user: any) {
    try {
      // Si nécessaire, tu peux restreindre l'accès aux admins seulement
      // if (user.role !== "admin") {
      //     return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
      // }

      const roles = await Roles.getAll();
      return new Response(JSON.stringify(roles), {
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
    try {
      // Vérification du rôle admin
      if (user.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
        });
      }

      const body = await req.json();
      const role = await Roles.create(body);
      return new Response(JSON.stringify(role), {
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
};
