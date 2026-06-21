import { Router } from "express";
import { authenticate } from "../middleware/auth.Middleware";
import {fetchPokemon, pokeApiHealthCheck} from "../controllers/pokemon.Controller";

const router = Router();


router.get("/pokeapi/healthcheck", pokeApiHealthCheck);
router.get("/:name", fetchPokemon);
router.get("/auth/:name", authenticate, fetchPokemon);

export default router;