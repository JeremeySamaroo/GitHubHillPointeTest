import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTrainer, findByEmail } from "../repositories/trainer.Repository";
import { JWT_SECRET } from "../config/jwt";
import {Trainer} from "../models/trainer.Model";


export function validateTrainer(trainer: Trainer) {
    console.log("Entering validate Trainer");
    if (!trainer.firstName || trainer.firstName.trim() === "") {
        return "First name is required";
    }

    if (!trainer.lastName || trainer.lastName.trim() === "") {
        return "Last name is required";
    }
    const allowedEmailIfPlayer = ["Player"]
    if ((!trainer.email || trainer.email.trim() === "") && allowedEmailIfPlayer.includes(trainer.trainerType?.trim())) {
        return "Email is required if Trainer type is Player";
    }


    if ((!trainer.email.includes("@")) && allowedEmailIfPlayer.includes(trainer.trainerType?.trim())) {
        return "Email must contain @";
    }

    if (!trainer.password || trainer.password.trim() === "") {
        return "Password is required";
    }

    if (!trainer.trainerType) {
        return "Trainer type is required";
    }

    const allowed = ["Player", "NPC-Trainer", "NPC-GYM-Leader"];

    if (!allowed.includes(trainer.trainerType?.trim())) {
        return "Invalid trainer type";
    }

    return null;
}

export async function signup(trainer: any) {
    const error = validateTrainer(trainer);

    if (error) {
        throw new Error(error);
    }

    const existing = await findByEmail(trainer.email);

    const allowed = ["Player"];
    if (existing && allowed.includes(trainer.trainerType?.trim())) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(
        trainer.password,
        10
    );

    trainer.password = hashedPassword;

    return createTrainer(trainer);
}

export async function login(
    email: string,
    password: string
) {
    const trainer = await findByEmail(email);

    if (!trainer) {
        throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(
        password,
        trainer.password
    );

    if (!valid) {
        throw new Error("Invalid credentials");
    }

    return jwt.sign(
        {
            id: trainer.id,
            email: trainer.email,
            trainerType: trainer.trainer_type
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
}