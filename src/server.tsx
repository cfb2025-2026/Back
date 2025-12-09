// src/server.tsx
import { serve } from "bun";
import supabase from "./config/supabaseClient";

// Import des routes
import { productsRoutes } from "./routes/ProductRoutes";
import { usersRoutes } from "./routes/UsersRoutes";
import { sellersRoutes } from "./routes/SellersRoutes";
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
  "/api/roles": rolesRoutes,
  "/api/carts": cartsRoutes,
  "/api/orders": commandsRoutes,
  "/api/items": itemsRoutes,
  "/api/userroles": userRolesRoutes,
  "/api/productattributecategory": productAttributeCategoryRoutes,
  "/api/productinorder": productInOrderRoutes,
  "/api/cartitem": cartItemRoutes,
  "/api/login": loginRoute,
};

const allowedOrigin = "*";

// Routes nécessitant un JWT
const protectedRoutes = [
  "/api/users",
  "/api/carts",
  "/api/orders",
  "/api/userroles",
];

// Wrapper CORS
function withCors(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", allowedOrigin);
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey");
  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  return new Response(response.body, { status: response.status, headers });
}

// Middleware JWT
async function authMiddleware(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing token" }), { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const jwt = await import("jsonwebtoken");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    return decoded;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}

const server = serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "");
    console.log("➡️ Request:", req.method, path);

    // Preflight CORS
    if (req.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    // Parcours des routes
    for (const [prefix, handler] of Object.entries(routes)) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        let user: any = null;

        // Détermine si la route est protégée
        const needsAuth =
            protectedRoutes.some(route => path.startsWith(route)) ||
            (path.startsWith("/api/products") && ["POST", "PUT", "DELETE"].includes(req.method));

        // Sauf POST public /api/users
        const isPublicPostUser = path === "/api/users" && req.method === "POST";

        if (needsAuth && !isPublicPostUser) {
          const authResult = await authMiddleware(req);
          if (authResult instanceof Response) return withCors(authResult);
          user = authResult;
        }

        try {
          const response = await handler(req, path, user);
          return withCors(response);
        } catch (e: any) {
          console.error("❌ Server error:", e);
          return withCors(new Response(JSON.stringify({ error: e.message }), { status: 500 }));
        }
      }
    }

    return withCors(new Response(JSON.stringify({ error: "Not found" }), { status: 404 }));
  },
  port: process.env.PORT || 5000,
});

console.log("🚀 Server running");