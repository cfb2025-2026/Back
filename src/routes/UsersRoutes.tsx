import { UsersControllers } from "../controllers/UsersControllers.tsx";

export async function usersRoutes(req: Request, path: string) {
  if (req.method === "GET" && path === "/api/users")
    return UsersControllers.getAll(req);
  if (req.method === "GET" && path.match(/^\/api\/users\/[0-9a-fA-F-]+$/)) {
    const id = path.split("/").pop() as string;
    return UsersControllers.getById(req, id);
  }
  if (req.method === "POST" && path === "/api/users")
    return UsersControllers.create(req);
  if (req.method === "PUT" && path.match(/^\/api\/users\/\d+$/)) {
    const id = String(path.split("/").pop());
    return UsersControllers.update(req, id);
  }
  if (req.method === "DELETE" && path.match(/^\/api\/users\/\d+$/)) {
    const id = String(path.split("/").pop());
    return UsersControllers.delete(req, id);
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
