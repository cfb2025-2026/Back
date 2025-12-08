import { ItemModel } from "../models/Items.tsx";

export const ItemsControllers = {
  async getAll(req: Request) {
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

  async create(req: Request) {
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
