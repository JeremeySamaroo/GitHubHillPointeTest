import { Router } from "express";
import {fetchPokemon, pokeApiHealthCheck} from "../controllers/pokemon.controller";

const router = Router();


router.get("/pokeapi/healthcheck", pokeApiHealthCheck);
router.get("/:name", fetchPokemon);


export default router;