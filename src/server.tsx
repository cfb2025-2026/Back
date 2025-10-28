// src/server.tsx
import { serve } from "bun";

// Import des routes
import { ProductsRoutes } from "./routes/ProductRoutes.tsx";
import { usersRoutes } from "./routes/UsersRoutes.tsx";
import { cartsRoutes } from "./routes/CartsRoutes.tsx";
import { commandsRoutes } from "./routes/CommandsRoutes.tsx";
import { itemsRoutes } from "./routes/ItemsRoutes.tsx";
import { productAttributeCategoryRoutes } from "./routes/Products_Attributes_Category_Routes.tsx";
import { productInOrderRoutes } from "./routes/Products_InCommands_Routes.tsx";
import { cartItemRoutes } from "./routes/CartsItemRoutes.tsx";

// 🔍 est-ce qu'on est en mode "check CI" ?
const isCIMode = process.argv.includes("--check-startup");

// Mapping des routes
const routes: Record<string, any> = {
  "/api/products": ProductsRoutes,
  "/api/users": usersRoutes,
  "/api/carts": cartsRoutes,
  "/api/orders": commandsRoutes,
  "/api/items": itemsRoutes,
  "/api/productattributecategory": productAttributeCategoryRoutes,
  "/api/productinorder": productInOrderRoutes,
  "/api/cartitem": cartItemRoutes,
};

// Fonction fetch réutilisable
async function fetchHandler(req: Request): Promise<Response> {
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

// 🧪 Mode CI : on vérifie juste que tout s'initialise bien et on sort
if (isCIMode) {
  console.log("✅ Startup check passed (CI mode) - server not started.");
  // Pas de serve(), pas d'écoute réseau
  // On laisse juste le script se terminer proprement
} else {
  // 🚀 Mode normal : on lance le serveur HTTP
  const server = serve({
    fetch: fetchHandler,
    port: 5000,
  });

  console.log(`🚀 Server running at ${server.url}`);
}
