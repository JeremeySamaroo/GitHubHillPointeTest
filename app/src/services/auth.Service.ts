import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTrainer, findByEmail } from "../repositories/trainer.Repository";
import { JWT_SECRET } from "../config/jwt";

export async function signup(trainer: any) {
    const existing = await findByEmail(trainer.email);

    if (existing) {
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