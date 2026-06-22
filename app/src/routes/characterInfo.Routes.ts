import { Router } from "express";

import {
    createCharacterInfoController
} from "../controllers/characterInfo.Controller";

import {
    authenticate
} from "../middleware/auth.Middleware";

const router = Router();

router.post(
    "/auth/createCharacterInfo",
    authenticate,
    createCharacterInfoController
);

router.post(
    "/createCharacterInfo",
    createCharacterInfoController
);

export default router;