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
            const product = await ProductModel.getById(Number(req.params.id));
            if (!product) return res.status(404).json({ message: "Produit non trouvé" });
            return res.json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },

    async create(req: any, res: any) {
        try {
            const product = await ProductModel.create(req.body);
            return res.status(201).json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req: any, res: any) {
        try {
            const product = await ProductModel.update(Number(req.params.id), req.body);
            return res.json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },

    async delete(req: any, res: any) {
        try {
            const response = await ProductModel.delete(Number(req.params.id));
            return res.json(response);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    },
};
