import { ProductInCommandsModel } from "../models/Product_InCommands";

export const ProductInOrderController = {
  async create(req: Request, user: any) {
    try {
      // Vérifie que l'utilisateur est admin (ou propriétaire de la commande si tu veux plus souple)
      if (user.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      const body = await req.json();
      // Ici, tu peux éventuellement vérifier que body.order_id appartient à l'utilisateur ou existe
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
