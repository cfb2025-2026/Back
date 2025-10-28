// src/server.tsx
import { serve } from "bun";

// Import des routes
import { ProductsRoutes } from "./routes/ProductRoutes.ts";
import { usersRoutes } from "./routes/UsersRoutes.ts";
import { cartsRoutes } from "./routes/CartsRoutes.ts";
import { commandsRoutes } from "./routes/CommandsRoutes.ts";
import { itemsRoutes } from "./routes/ItemsRoutes.ts";
import { productAttributeCategoryRoutes } from "./routes/Products_Attributes_Category_Routes.ts";
import { productInOrderRoutes } from "./routes/Products_InCommands_Routes.ts";
import { cartItemRoutes } from "./routes/CartsItemRoutes.ts";

// Mapping des routes
const routes: Record<string, any> = {
  "/api/products": ProductsRoutes, // Get ALL / GET BY ID / Create / Update / Delete
  "/api/users": usersRoutes, // Get ALL / GET BY ID / Create / Update / Delete
  "/api/carts": cartsRoutes, // Get ALL / GET BY ID / Create / Update / Delete
  "/api/orders": commandsRoutes, // Get ALL / GET BY ID / Create / Update / Delete
  "/api/items": itemsRoutes, // Route à faire ?
  "/api/productCat": productAttributeCategoryRoutes, // GET ALL / Create
  "/api/productOrder": productInOrderRoutes, // GET ALL / Create
  "/api/cartItem": cartItemRoutes, // Route à faire ?
};

// Serveur Bun
const server = serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // 1️⃣ Routes API
    for (const [prefix, routeHandler] of Object.entries(routes)) {
      if (path.startsWith(prefix)) {
        return await routeHandler(req, path);
      }
    }


    // 3️⃣ 404
    return new Response("Not found", { status: 404 });
  }
});

console.log(`🚀 Server running at ${server.url}`);
