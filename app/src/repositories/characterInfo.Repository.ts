
import { pool } from "../config/db_PoolConfig";
import { CharacterInfo } from "../models/characterInfo.Model";

export async function createCharacterInfo(
    characterInfo: CharacterInfo
) {
    const query = `
        INSERT INTO character_info
        (
            description,
            current_level,
            amount_of_pokemon_can_have,
            trainer_id
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [
        characterInfo.description,
        characterInfo.currentLevel,
        characterInfo.amountOfPokemonCanHave,
        characterInfo.trainerId
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function getCharacterInfoByTrainerId(
    trainerId: number
) {
    const result = await pool.query(
        `
        SELECT *
        FROM character_info
        WHERE trainer_id = $1
        `,
        [trainerId]
    );

    return result.rows[0];
}