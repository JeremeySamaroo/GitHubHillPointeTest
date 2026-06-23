// import { Router } from "express";
//
// import { authenticate } from "../middleware/auth.Middleware";
//
// import { TrainerRepository } from "../repositories/trainer.Repository";
// import { PlayerBadgeRepository } from "../repositories/playerBadge.Repository";
// import { PlayerPokemonRepository } from "../repositories/playerPokemon.Repository";
//
// import { PokemonApiService } from "../services/pokeApi.Service";
// import { TeamService } from "../services/teamPokemon.Service";
// import { TrainerProfileService } from "../services/trainerProfile.Service";
// import {TrainerService} from "../services/trainer.Service";
//
// const router = Router();
//
// // repositories
// const trainerRepository = new TrainerRepository();
// const badgeRepository = new PlayerBadgeRepository();
// const pokemonRepository = new PlayerPokemonRepository();
//
// // services
// const trainerService = new TrainerService();
// const pokemonApiService = new PokemonApiService();
//
// const teamMovesService = new TeamService(
//     trainerService,
//     pokemonRepository,
//     pokemonApiService,
//     trainerRepository
// );
//
// const profileService = new TrainerProfileService(
//     trainerRepository,
//     badgeRepository,
//     teamMovesService
// );
//
// router.get(
//     "/:identifier/profile",
//     authenticate,
//     async (req, res) => {
//         try {
//
//             const { identifier } = req.params;
//
//             const profile =
//                 await profileService.getFullProfile(
//                     identifier
//                 );
//
//             return res.status(200).json(profile);
//
//         } catch (error) {
//
//             return res.status(400).json({
//                 message:
//                     error instanceof Error
//                         ? error.message
//                         : "Unknown error"
//             });
//         }
//     }
// );
//
// export default router;