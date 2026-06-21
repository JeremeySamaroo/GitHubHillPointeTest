import request from "supertest";
import app from "../app";

describe("GET /pokemon/:name", () => {

    it("should return pikachu data", async () => {
        const response = await request(app).get("/pokemon/pikachu");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            name: "pikachu",
            id: 25,
            height: 4,
            weight: 60,
            types: ["electric"]
        });
    });

    it("should return error for invalid pokemon", async () => {
        const response = await request(app).get("/pokemon/pikachus");

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
            message: "Failed to fetch Pokémon"
        });
    });

});