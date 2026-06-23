import { Router } from "express";
import { TrainerRepository } from "../repositories/trainer.Repository";
import { PlayerPokemonRepository } from "../repositories/playerPokemon.Repository";
import { PlayerBadgeRepository } from "../repositories/playerBadge.Repository";

import { TrainerService } from "../services/trainer.Service";
import { PokemonApiService } from "../services/pokeApi.Service";
import { TeamService } from "../services/teamPokemon.Service";
import { BadgeService } from "../services/badge.Service";
import {authenticate} from "../middleware/auth.Middleware";
import {TrainerProfileService} from "../services/trainerProfile.Service";

const router = Router();

const trainerRepository = new TrainerRepository();
const playerPokemonRepository = new PlayerPokemonRepository();
const playerBadgeRepository = new PlayerBadgeRepository();

const trainerService = new TrainerService(trainerRepository);

const pokemonApiService = new PokemonApiService();

const teamService = new TeamService(
    trainerService,
    playerPokemonRepository,
    pokemonApiService,
    trainerRepository,
);
router.get("/:identifier", async (req, res) => {
    try {
        const { identifier } = req.params;

        const trainer =
            await trainerService.getTrainerByIdentifier(identifier);

        if (!trainer) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        const team =
            await teamService.generateTeam(identifier);

        return res.status(200).json({
            trainer,
            team
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

const teamMovesService =
    new TeamService(
        trainerService,
        playerPokemonRepository,
        pokemonApiService,
        trainerRepository
    );
// router.get(
//     "/:identifier/moves",
//     authenticate,
//     async (req, res) => {
//         try {
//             const result =
//                 await teamMovesService.getTeamWithMoves(
//                     req.params.identifier
//                 );
//
//             return res.status(200).json(result);
//
//         } catch (error) {
//
//             console.error(error);
//
//             return res.status(500).json({
//                 message:
//                     error instanceof Error
//                         ? error.message
//                         : "Internal server error"
//             });
//         }
//     }
// );

router.get(
    "/:identifier/moves",
    authenticate,
    async (req, res) => {
        try {
            const { identifier } = req.params;

            const user = (req as any).user;

            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            const tokenId = String(user.id);
            const tokenEmail = String(user.email);

            const authorized =
                identifier === tokenId ||
                identifier.toLowerCase() === tokenEmail.toLowerCase();

            if (!authorized) {
                return res.status(403).json({
                    message:
                        "You are not authorized to view another trainer's team"
                });
            }

            const result =
                await teamMovesService.getTeamWithMoves(
                    identifier
                );

            return res.status(200).json(result);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Internal server error"
            });
        }
    }
);


const badgeService =
    new BadgeService(
        trainerRepository,
        playerPokemonRepository,
        playerBadgeRepository
    );

router.post(
    "/challenge",
    authenticate,
    async (req, res) => {

        try {

            const {
                trainerIdentifier,
                gymLeaderIdentifier
            } = req.body;

            const result =
                await badgeService.challengeGymLeader(
                        trainerIdentifier,
                        gymLeaderIdentifier
                    );

            return res
                .status(200)
                .json(result);

        } catch (error) {

            return res
                .status(400)
                .json({
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unknown error"
                });
        }
    }
);


const badgeRepository = new PlayerBadgeRepository();

const profileService = new TrainerProfileService(
    trainerRepository,
    badgeRepository,
    teamMovesService
);
router.get(
    "/:identifier/profile",
    authenticate,
    async (req, res) => {
        try {

            const { identifier } = req.params;

            const profile =
                await profileService.getFullProfile(
                    identifier
                );

            return res.status(200).json(profile);

        } catch (error) {

            return res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error"
            });
        }
    }
);

export default router;