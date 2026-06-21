import { Request, Response } from "express";

import {
    signup,
    login
} from "../services/auth.Service";

export async function signupController(
    req: Request,
    res: Response
) {
    try {
        const trainer = await signup(req.body);

        res.status(201).json(trainer);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function loginController(
    req: Request,
    res: Response
) {
    try {
        const token = await login(
            req.body.email,
            req.body.password
        );

        res.json({
            token
        });
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        });
    }
}

const tokenBlacklist = new Set<string>();

export function logoutController(req: any, res: any) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    tokenBlacklist.add(token);

    return res.json({
        message: "Logged out successfully"
    });
}

export { tokenBlacklist };