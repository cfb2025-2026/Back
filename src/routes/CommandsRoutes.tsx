    import { CommandsControllers } from "../controllers/CommandsControllers";

    export async function commandsRoutes(req: Request, path: string, user: any) {
        // Vérifier que l'utilisateur est authentifié
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // GET /api/orders -> récupérer toutes les commandes (admin) ou commandes de l'utilisateur
        if (req.method === "GET" && path === "/api/orders") {
            return CommandsControllers.getAll(req, user);
        }

        // POST /api/orders -> créer une commande pour l'utilisateur connecté
        if (req.method === "POST" && path === "/api/orders") {
            return CommandsControllers.create(req, user);
        }

        // PUT /api/orders/:id -> mettre à jour une commande
        if (req.method === "PUT" && path.match(/^\/api\/orders\/\d+$/)) {
            const id = Number(path.split("/").pop());
            return CommandsControllers.update(req, id, user);
        }

        // DELETE /api/orders/:id -> supprimer une commande
        if (req.method === "DELETE" && path.match(/^\/api\/orders\/\d+$/)) {
            const id = Number(path.split("/").pop());
            return CommandsControllers.delete(req, id, user);
        }

        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
