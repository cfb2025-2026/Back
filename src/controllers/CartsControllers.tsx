import { CartsModel } from "../models/Carts";
export const CartController = {
  async getAll(req: Request, user: any) {
    try {
      let carts;
      if (user.isAdmin === true) {
        carts = await CartsModel.getAll();
      } else {
        carts = await CartsModel.getByUserId(user.id);
      }
      return new Response(JSON.stringify(carts), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async getById(req: Request, id: string, user: any) {
    try {
      const cart = await CartsModel.getById(id);
      if (!cart)
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });

      if (cart.users_id !== user.id && user.isAdmin !== true) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(cart), {
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
      const body = await req.json();
      const { product_id, product_quantity = 1 } = body;

      if (!product_id) {
        return new Response(JSON.stringify({ error: "Product ID required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Vérifie si le produit est déjà dans le panier
      const existingItem = await CartsModel.getByUserAndProduct(
        user.id,
        product_id,
      );

      let cartItem;
      if (existingItem) {
        // Incrémente la quantité
        cartItem = await CartsModel.update(existingItem.cart_item_id, {
          product_quantity: existingItem.product_quantity + product_quantity,
        });
      } else {
        // Crée un nouvel item
        cartItem = await CartsModel.create({
          users_id: user.id,
          product_id,
          product_quantity,
        });
      }

      return new Response(JSON.stringify(cartItem), {
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

  async update(req: Request, id: string, user: any) {
    try {
      const cart = await CartsModel.getById(id);
      if (!cart)
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });

      if (cart.users_id !== user.id && user.isAdmin !== true) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      const body = await req.json();
      const updatedCart = await CartsModel.update(id, body);
      return new Response(JSON.stringify(updatedCart), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async delete(req: Request, id: string, user: any) {
    try {
      const cart = await CartsModel.getById(id);
      if (!cart)
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });

      if (cart.users_id !== user.id && user.isAdmin !== true) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      const result = await CartsModel.delete(id);
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
