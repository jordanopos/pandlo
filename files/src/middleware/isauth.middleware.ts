import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("Not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY as string);
        context.payload = payload as any;
    } catch (err) {
        console.log(err)
        throw new Error("Not authenticated");
    }
    return next();
};


export interface MyContext {
    req: Request;
    res: Response;
    payload?: { email: string };
}

