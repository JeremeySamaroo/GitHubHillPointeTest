import { Request, Response } from "express";

import {
    createCharacter
} from "../services/characterInfo.Service";

export async function createCharacterInfoController(
    req: Request,
    res: Response
) {
    try {
        const result = await createCharacter(
            req.body,
        );

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}