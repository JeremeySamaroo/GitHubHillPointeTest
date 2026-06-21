import dotenv from "dotenv";
import axios from "axios";

const POKE_API_BASE = process.env.POKE_API_BASE_ENV || "https://pokeapi.co/api/v2";

console.log("The base poke API is: "+POKE_API_BASE);

export async function checkPokeApiHealth() {
    try {
        // lightweight request
        const response = await axios.get(`${POKE_API_BASE}/pokemon/pikachu`, {
            timeout: 5000,
        });

        return {
            status: "UP",
            pokeapiStatus: response.status,
        };
    } catch (error: any) {
        return {
            status: "DOWN",
            error: error.message,
        };
    }
}

export async function getPokemon(name: string) {
    try {
        const response = await axios.get(
            `${POKE_API_BASE}/pokemon/${name}`
        );

        return response.data;
    } catch (error: any) {
        console.error("Error fetching Pokemon:", error.message);
        throw error;
    }
}