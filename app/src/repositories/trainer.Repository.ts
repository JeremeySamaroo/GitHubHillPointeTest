
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

export async function findByEmail(email: string) {
    const result = await pool.query(
        "SELECT * FROM trainers WHERE email = $1",
        [email]
    );

    return result.rows[0];
}