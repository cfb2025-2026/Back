import { ItemModel } from "../models/Items";

export const ItemsControllers = {
  async getAll(req: Request, user: any) {
    // GET accessible à tous les utilisateurs connectés
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    try {
      const items = await ItemModel.getAll();
      return new Response(JSON.stringify(items), {
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
    // POST réservé aux admins
    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }

    try {
      const body = await req.json();
      const item = await ItemModel.create(body);
      return new Response(JSON.stringify(item), {
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
