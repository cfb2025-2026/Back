import { UserModel } from "../models/Users";
import bcrypt from "bcrypt";

export const UsersControllers = {
    async getAll(req: Request) {
        try {
            const users = await UserModel.getAll();
            return Response.json(users);
        } catch (err: any) {
            return Response.json({ error: err.message }, { status: 500 });
        }
    },

    async getById(req: Request, id: string) {
        try {
            const user = await UserModel.getById(id);
            return Response.json(user);
        } catch (err: any) {
            return Response.json({ error: "Not found" }, { status: 404 });
        }
    },

    async create(req: Request) {
        try {
            const body = await req.json();

            // hash password before creating
            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;

            const user = await UserModel.create(body);
            return Response.json(user);
        } catch (err: any) {
            return Response.json({ error: err.message }, { status: 500 });
        }
    },

    async update(req: Request, id: string) {
        try {
            const body = await req.json();

            // hash password only if changed
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 10);
            }

            const user = await UserModel.update(id, body);
            return Response.json(user);
        } catch (err: any) {
            return Response.json({ error: err.message }, { status: 500 });
        }
    },

    async delete(req: Request, id: string) {
        try {
            const deleted = await UserModel.delete(id);
            return Response.json(deleted);
        } catch (err: any) {
            return Response.json({ error: err.message }, { status: 500 });
        }
    }
};
