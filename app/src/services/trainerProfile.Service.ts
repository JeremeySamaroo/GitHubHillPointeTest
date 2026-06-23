import { TrainerRepository } from "../repositories/trainer.Repository";
import { PlayerBadgeRepository } from "../repositories/playerBadge.Repository";
import { TeamService } from "./teamPokemon.Service";

export class TrainerProfileService {

    constructor(
        private trainerRepository: TrainerRepository,
        private playerBadgeRepository: PlayerBadgeRepository,
        private teamMovesService: TeamService
    ) {}

    async getFullProfile(identifier: string) {

        // 1. Trainer + Character info
        const trainer =
            await this.trainerRepository
                .findTrainerWithCharacterInfo(identifier);

        if (!trainer) {
            throw new Error("Trainer not found");
        }

        // 2. Badges
        const badges =
            await this.playerBadgeRepository
                .getBadgesByTrainerId(trainer.id);

        // 3. Team + Moves (REUSED SERVICE)
        const team =
            await this.teamMovesService
                .getTeamWithMoves(identifier);

        return {
            trainer: {
                id: trainer.id,
                first_name: trainer.first_name,
                last_name: trainer.last_name,
                email: trainer.email,
                trainer_type: trainer.trainer_type
            },
            character_info: {
                description: trainer.description,
                current_level: trainer.current_level,
                amount_of_pokemon_can_have:
                trainer.amount_of_pokemon_can_have
            },
            team: team.team,
            badges
        };
    }
}