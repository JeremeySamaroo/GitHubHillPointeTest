import { TrainerService } from "./trainer.Service";
import { PlayerPokemonRepository } from "../repositories/playerPokemon.Repository";
import { PokemonApiService } from "./pokeApi.Service";
import {TrainerRepository} from "../repositories/trainer.Repository";

export class TeamService {
    constructor(
        private trainerService: TrainerService,
        private playerPokemonRepo: PlayerPokemonRepository,
        private pokemonApiService: PokemonApiService,
        private trainerRepository: TrainerRepository
) {}


    async getTrainerByIdentifier(identifier: string) {

        const isNumeric = /^\d+$/.test(identifier);

        if (isNumeric) {
            return this.trainerRepository.findTrainerById(
                Number(identifier)
            );
        }

        return this.trainerRepository.findTrainerByEmail(
            identifier
        );
    }

    async generateTeam(identifier: string) {
        const trainer =
            await this.trainerService.getTrainerByIdentifier(identifier);

        if (!trainer) {
            throw new Error("Trainer not found");
        }

        const teamSize =
            trainer.character_info?.amount_of_pokemon_can_have ?? 0;

        if (teamSize <= 0) {
            throw new Error("Trainer cannot have pokemon");
        }

        const existingTeam =
            await this.playerPokemonRepo.findByTrainerId(
                trainer.trainer_id
            );

        if (existingTeam.length > 0) {
            await this.playerPokemonRepo.deleteTeam(
                trainer.trainer_id
            );
        }

        const generatedTeam = [];

        const usedPokemonIds = new Set<number>();

        while (generatedTeam.length < teamSize) {
            const pokemon =
                await this.pokemonApiService.getRandomPokemon();

            if (usedPokemonIds.has(pokemon.id)) {
                continue;
            }

            usedPokemonIds.add(pokemon.id);

            generatedTeam.push({
                pokemon_id: pokemon.id,
                pokemon_name: pokemon.name,
                trainer_id: trainer.trainer_id,
                level: Math.floor(Math.random() * 100) + 1,
            });
        }

        await this.playerPokemonRepo.createTeam(generatedTeam);

        return generatedTeam;
    }

    async getTeamWithMoves(identifier: string) {

        const trainer =
            await this.trainerService
                .getTrainerByIdentifier(identifier);

        console.log(trainer)

        if (!trainer) {
            throw new Error("Trainer not found");
        }

        const team =
            await this.playerPokemonRepo
                .getTeamByTrainerId(trainer.trainer_id);

        const teamWithMoves =
            await Promise.all(
                team.map(async pokemon => {

                    const moves =
                        await this.pokemonApiService
                            .getMoves(
                                pokemon.pokemon_id
                            );

                    return {
                        pokemon_id: pokemon.pokemon_id,
                        pokemon_name: pokemon.pokemon_name,
                        level: pokemon.level,
                        moves
                    };
                })
            );

        return {
            trainer_id: trainer.trainer_id,
            trainer_type: trainer.trainer_type,
            team: teamWithMoves
        };
    }



}