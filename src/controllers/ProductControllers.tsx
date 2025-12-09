import { ProductModel } from "../models/Product.tsx";

export const ProductController = {
  async getAll(req: Request) {
    try {
      const users = await ProductModel.getAll();
      return new Response(JSON.stringify(users), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async getById(req: Request, id: string) {
    try {
      const user = await ProductModel.getById(id);
      return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async getImages(req: Request, id: string): Promise<Response> {
    try {
      const images = await ProductModel.getImages(id);

      return new Response(JSON.stringify(images), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la récupération des images" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  async create(req: Request) {
    try {
      const body = await req.json();
      const user = await ProductModel.create(body);
      return new Response(JSON.stringify(user), {
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

  async update(req: Request, id: string) {
    try {
      const body = await req.json();
      const user = await ProductModel.update(id, body);
      return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async delete(req: Request, id: string) {
    try {
      const result = await ProductModel.delete(id);
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

   async getFiltered(req: Request) {
    try {
      const url = new URL(req.url);
      const categoryId = url.searchParams.get("category_id") ?? undefined;
      const attributeId = url.searchParams.get("attribute_id") ?? undefined;

      const products = await ProductModel.getByFilter({
        category_id: categoryId,
        attribute_id: attributeId,
      });

      return new Response(JSON.stringify(products), {
        status: 200,
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
