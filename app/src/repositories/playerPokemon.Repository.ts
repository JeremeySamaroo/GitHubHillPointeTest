import { pool } from "../config/db_PoolConfig";

export type PlayerPokemon = {
    pokemon_id: number;
    pokemon_name: string;
    trainer_id: number;
    level: number;
};

export type PlayerPokemonEntity = {
    id: number;
    pokemon_id: number;
    pokemon_name: string;
    trainer_id: number;
    level: number;
};

export class PlayerPokemonRepository {
    async findByTrainerId(trainerId: number) {
        const result = await pool.query(
            `
      SELECT *
      FROM player_pokemon
      WHERE trainer_id = $1
      `,
            [trainerId]
        );

        return result.rows;
    }

    async deleteTeam(trainerId: number): Promise<void> {
        await pool.query(
            `
      DELETE FROM player_pokemon
      WHERE trainer_id = $1
      `,
            [trainerId]
        );
    }

    async createTeam(team: PlayerPokemon[]): Promise<void> {
        for (const pokemon of team) {
            await pool.query(
                `
        INSERT INTO player_pokemon (
            pokemon_id,
            pokemon_name,
            trainer_id,
            level
        )
        VALUES ($1, $2, $3, $4)
        `,
                [
                    pokemon.pokemon_id,
                    pokemon.pokemon_name,
                    pokemon.trainer_id,
                    pokemon.level,
                ]
            );
        }
    }

    async getTeamByTrainerId(
        trainerId: number
    ): Promise<PlayerPokemonEntity[]> {

        const result = await pool.query(
            `
            SELECT
                id,
                pokemon_id,
                pokemon_name,
                trainer_id,
                level
            FROM player_pokemon
            WHERE trainer_id = $1
            ORDER BY id
            `,
            [trainerId]
        );

        return result.rows;
    }

    async getTotalTeamLevel(
        trainerId: number
    ): Promise<number> {

        const result = await pool.query(
            `
        SELECT
            COALESCE(SUM(level), 0) total_level
        FROM player_pokemon
        WHERE trainer_id = $1
        `,
            [trainerId]
        );

        return Number(
            result.rows[0].total_level
        );
    }

}//end class


