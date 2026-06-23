import { TrainerRepository } from "../repositories/trainer.Repository";
import { PlayerPokemonRepository } from "../repositories/playerPokemon.Repository";
import { PlayerBadgeRepository } from "../repositories/playerBadge.Repository";

export class BadgeService {

    constructor(
        private trainerRepository: TrainerRepository,
        private playerPokemonRepository: PlayerPokemonRepository,
        private playerBadgeRepository: PlayerBadgeRepository
    ) {}

    async challengeGymLeader(
        trainerIdentifier: number,
        gymLeaderIdentifier: number
    ) {

        const trainer =
            await this.trainerRepository
                .findTrainerById(
                    trainerIdentifier
                );

        if (!trainer) {
            throw new Error(
                "Trainer not found"
            );
        }

        const gymLeader =
            await this.trainerRepository
                .findTrainerById(
                    gymLeaderIdentifier
                );


        console.log("Gym-Leader: ",gymLeader);

        if (!gymLeader) {
            throw new Error(
                "Gym leader not found"
            );
        }

        if (
            gymLeader.trainer_type !==
            "NPC-GYM-Leader"
        ) {
            throw new Error(
                "Selected trainer is not a gym leader"
            );
        }

        const trainerTeamLevel =
            await this.playerPokemonRepository
                .getTotalTeamLevel(
                    trainer.id
                );

        const gymLeaderTeamLevel =
            await this.playerPokemonRepository
                .getTotalTeamLevel(
                    gymLeader.id
                );

        if (
            trainerTeamLevel <=
            gymLeaderTeamLevel
        ) {
            return {
                badgeEarned: false,
                trainerTeamLevel,
                gymLeaderTeamLevel,
                message:
                    "Gym leader defeated the trainer"
            };
        }

        const badgeName =
            `${gymLeader.first_name} ${gymLeader.last_name} Gym Badge`;

        const alreadyEarned =
            await this.playerBadgeRepository
                .hasBadge(
                    trainer.id,
                    badgeName
                );

        if (!alreadyEarned) {
            await this.playerBadgeRepository
                .createBadge(
                    trainer.id,
                    badgeName
                );
        }

        return {
            badgeEarned: true,
            badgeName,
            trainerTeamLevel,
            gymLeaderTeamLevel,
            message:
                "Trainer earned a badge"
        };
    }
}