// src/server.tsx
import { serve } from "bun";
import supabase from "./config/supabaseClient";

// Import des routes
import { productsRoutes } from "./routes/ProductRoutes";
import { usersRoutes } from "./routes/UsersRoutes";
import { sellersRoutes } from "./routes/SellersRoutes";
import { buyersRoutes } from "./routes/BuyersRoutes";
import { rolesRoutes } from "./routes/RolesRoutes";
import { cartsRoutes } from "./routes/CartsRoutes";
import { commandsRoutes } from "./routes/CommandsRoutes";
import { itemsRoutes } from "./routes/ItemsRoutes";
import { userRolesRoutes } from "./routes/UsersRolesRoutes";
import { productAttributeCategoryRoutes } from "./routes/Products_Attributes_Category_Routes";
import { productInOrderRoutes } from "./routes/Products_InCommands_Routes";
import { cartItemRoutes } from "./routes/CartsItemRoutes";
import { loginRoute } from "./routes/LoginRoutes";

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
  "/api/login": loginRoute, // route login
};

const allowedOrigin = "*"; // Render accepte toutes origines

// Routes à protéger (JWT obligatoire)
const protectedRoutes = [
  "/api/users",
  "/api/carts",
  "/api/orders",
  "/api/userroles",
];

// Middleware d'authentification JWT
async function authMiddleware(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing token" }), { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Vérification du token JWT
    const jwt = await import("jsonwebtoken");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    return decoded;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}

// Serve Bun
const server = serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, ""); // retire les slashes finaux
    console.log("➡️ Request:", req.method, path);

    // Preflight CORS
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

    // Parcours des routes
    for (const [prefix, handler] of Object.entries(routes)) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        // Vérification JWT si route protégée
        let user: any = null;
        if (protectedRoutes.some(route => path.startsWith(route))) {
          const authResult = await authMiddleware(req);
          if (authResult instanceof Response) return authResult;
          user = authResult;
        }

        try {
          const response = await handler(req, path, user);
          return new Response(response.body, {
            status: response.status,
            headers: {
              ...Object.fromEntries(response.headers),
              "Access-Control-Allow-Origin": allowedOrigin,
              "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
            },
          });
        } catch (e: any) {
          console.error("❌ Server error:", e);
          return new Response(JSON.stringify({ error: e.message }), { status: 500 });
        }
      }
    }

    return new Response("Not found", {
      status: 404,
      headers: { "Access-Control-Allow-Origin": allowedOrigin },
    });
  },
  port: process.env.PORT || 5000,
});

console.log("🚀 Server running");
