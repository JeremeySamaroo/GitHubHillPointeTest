import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../controllers/auth.Controller";

import { JWT_SECRET } from "../config/jwt";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    const token = authHeader.replace(
        "Bearer ",
        ""
    );

    // console.log(token);

    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token has been logged out" });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        (req as any).user = decoded;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
