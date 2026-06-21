import { Request, Response } from "express";
import {checkPokeApiHealth, getPokemon} from "../services/pokeApi.Service";


export async function pokeApiHealthCheck(req: Request, res: Response) {
    const result = await checkPokeApiHealth();

    if (result.status === "UP") {
        return res.status(200).json({
            service: "pokeapi",
            status: "UP",
            pokeapiStatusCode: result.pokeapiStatus,
        });
    }

    return res.status(503).json({
        service: "pokeapi",
        status: "DOWN",
        error: result.error,
    });
}
export async function fetchPokemon(req: Request, res: Response) {
    try {
        // const { name } = req.params;

        const name = req.params.name as string;

        const data = await getPokemon(name);

        res.json({
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t: any) => t.type.name),
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch Pokémon",
        });
    }
}