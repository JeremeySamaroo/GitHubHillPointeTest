
import { pool } from "../config/db_PoolConfig";

export async function createTrainer(trainer: any) {
    const query = `
        INSERT INTO trainers
        (
            first_name,
            last_name,
            age,
            email,
            password,
            trainer_type
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
    `;

    const values = [
        trainer.firstName,
        trainer.lastName,
        trainer.age,
        trainer.email,
        trainer.password,
        trainer.trainerType
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function findById(id: number) {
    const result = await pool.query(
        "SELECT * FROM trainers WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

export async function findByEmail(email: String) {
    const result = await pool.query(
        "SELECT * FROM trainers WHERE email = $1",
        [email]
    );

    return result.rows[0];
}

export type TrainerRow = {
    id: number;
    trainer_type: string;
};

export type CharacterInfoRow = {
    description: string;
    current_level: number;
    amount_of_pokemon_can_have: number;
};

export class TrainerRepository {
    async findTrainerById(id: number): Promise<TrainerRow | null> {
        const res = await pool.query(
            `SELECT id, first_name, last_name, trainer_type FROM trainers WHERE id = $1`,
            [id]
        );

        return res.rowCount ? res.rows[0] : null;
    }

    async findTrainerByEmail(email: string): Promise<TrainerRow | null> {
        const res = await pool.query(
            `SELECT id, trainer_type FROM trainers WHERE email = $1`,
            [email]
        );

        return res.rowCount ? res.rows[0] : null;
    }

    async findCharacterInfoByTrainerId(
        trainerId: number
    ): Promise<CharacterInfoRow | null> {
        const res = await pool.query(
            `SELECT description, current_level, amount_of_pokemon_can_have
       FROM character_info
       WHERE trainer_id = $1`,
            [trainerId]
        );

        return res.rowCount ? res.rows[0] : null;
    }

    async findTrainerWithCharacterInfo(identifier: string) {

        const isId = /^\d+$/.test(identifier);

        const result = await pool.query(
            `
            SELECT
                t.id,
                t.first_name,
                t.last_name,
                t.email,
                t.trainer_type,
                ci.description,
                ci.current_level,
                ci.amount_of_pokemon_can_have
            FROM trainers t
            LEFT JOIN character_info ci
                ON ci.trainer_id = t.id
            WHERE ${isId ? "t.id = $1" : "t.email = $1"}
            `,
            [isId ? Number(identifier) : identifier]
        );

        return result.rows[0] || null;
    }
}
