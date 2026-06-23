
import { pool } from "../config/db_PoolConfig";

export class PlayerBadgeRepository {

    async hasBadge(
        trainerId: number,
        badgeName: string
    ): Promise<boolean> {

        const result = await pool.query(
            `
            SELECT id
            FROM player_badges
            WHERE trainer_id = $1
            AND badge_name = $2
            `,
            [trainerId, badgeName]
        );

        return result.rowCount! > 0;
    }

    async createBadge(
        trainerId: number,
        badgeName: string
    ): Promise<void> {

        await pool.query(
            `
            INSERT INTO player_badges
            (
                badge_name,
                trainer_id
            )
            VALUES
            (
                $1,
                $2
            )
            `,
            [badgeName, trainerId]
        );
    }

    async getBadgesByTrainerId(trainerId: number) {
        const result = await pool.query(
            `
            SELECT
                id,
                badge_name,
                trainer_id,
                created_at
            FROM player_badges
            WHERE trainer_id = $1
            ORDER BY created_at DESC
            `,
            [trainerId]
        );

        return result.rows;
    }
}