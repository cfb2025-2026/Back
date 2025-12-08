import { ProductInCommandsModel } from "../models/Product_InCommands.tsx";

export const ProductInOrderController = {
  async create(req: Request) {
    try {
      const body = await req.json();
      const link = await ProductInCommandsModel.create(body);
      return new Response(JSON.stringify(link), {
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
