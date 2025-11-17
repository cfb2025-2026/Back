// src/server.tsx
import { serve } from "bun";

// Import routes
import { productsRoutes } from "./routes/ProductRoutes.tsx";
import { usersRoutes } from "./routes/UsersRoutes.tsx";
import { sellersRoutes } from "./routes/SellersRoutes.tsx";
import { buyersRoutes } from "./routes/BuyersRoutes.tsx";
import { rolesRoutes } from "./routes/RolesRoutes.tsx";
import { cartsRoutes } from "./routes/CartsRoutes.tsx";
import { commandsRoutes } from "./routes/CommandsRoutes.tsx";
import { itemsRoutes } from "./routes/ItemsRoutes.tsx";
import { userRolesRoutes } from "./routes/UsersRolesRoutes.tsx";
import { productAttributeCategoryRoutes } from "./routes/Products_Attributes_Category_Routes.tsx";
import { productInOrderRoutes } from "./routes/Products_InCommands_Routes.tsx";
import { cartItemRoutes } from "./routes/CartsItemRoutes.tsx";

// Router mapping
const routes: Record<string, any> = {
  "/api/products": productsRoutes,
  "/api/users": usersRoutes,
  "/api/sellers": sellersRoutes,
  "/api/buyers": buyersRoutes,
  "/api/roles": rolesRoutes,
  "/api/carts": cartsRoutes,
  "/api/orders": commandsRoutes,
  "/api/items": itemsRoutes,
  "/api/userroles": userRolesRoutes,
  "/api/productattributecategory": productAttributeCategoryRoutes,
  "/api/productinorder": productInOrderRoutes,
  "/api/cartitem": cartItemRoutes,
};

const allowedOrigin = "*";

const server = serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
        },
      });
    }

    // Route matching
    for (const [prefix, handler] of Object.entries(routes)) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        const response = await handler(req, path);

        return new Response(response.body, {
          status: response.status,
          headers: {
            ...Object.fromEntries(response.headers),
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
          },
        });
      }
    }

    return new Response("Not found", {
      status: 404,
      headers: { "Access-Control-Allow-Origin": allowedOrigin },
    });
  },

  port: 5000,
});

console.log(`🚀 Server running at ${server.url}`);
