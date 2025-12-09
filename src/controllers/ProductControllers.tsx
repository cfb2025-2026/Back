import { ProductModel } from "../models/Product";

export const ProductController = {
    async getAll(req: any, res: any) {
        try {
            const products = await ProductModel.getAll();
            return res.json(products);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req: any, res: any) {
        try {
            const product = await ProductModel.getById(req.params.id); // <-- string
            if (!product) return res.status(404).json({ message: "Produit non trouvé" });
            return res.json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
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

    async update(req: any, res: any) {
        try {
            const product = await ProductModel.update(req.params.id, req.body); // <-- string
            return res.json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },

    async delete(req: any, res: any) {
        try {
            const response = await ProductModel.delete(req.params.id); // <-- string
            return res.json(response);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
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
