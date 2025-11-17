// src/server.tsx
import { serve } from "bun";

// Import des routes
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

// Mapping des routes
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

const allowedOrigin = "*"; // Render accepte toutes origines

const server = serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, ""); // supprime les slashes finaux
    console.log("➡️ Request:", req.method, path);

    // ✅ Handle CORS preflight
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

    // Routes API
    for (const [prefix, handler] of Object.entries(routes)) {
      if (path.startsWith(prefix)) {
        try {
          const response = await handler(req, path);

          // On reconstruit la réponse pour ajouter CORS
          const newResponse = new Response(response.body, {
            status: response.status,
            headers: {
              ...Object.fromEntries(response.headers),
              "Access-Control-Allow-Origin": allowedOrigin,
              "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
            },
          });

          return newResponse;
        } catch (e: any) {
          console.error("❌ Error in route handler:", e);
          return new Response(`Server error: ${e.message}`, { status: 500 });
        }
      }
    }

    // 404 si aucune route correspond
    return new Response("Not found", {
      status: 404,
      headers: { "Access-Control-Allow-Origin": allowedOrigin },
    });
  },

  port: process.env.PORT ? Number(process.env.PORT) : 5000,
});

console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
