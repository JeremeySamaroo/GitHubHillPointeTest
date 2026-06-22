import request from "supertest";
import app from "../app";

describe("POST /auth/signup - validation tests", () => {

    it("should fail when trainerType is invalid", async () => {
        const res = await request(app).post("/auth/signup").send({
            firstName: "Ash",
            lastName: "Ketchum",
            age: 12,
            email: "ash@test.com",
            password: "pikachu123",
            trainerType: "INVALID_TYPE"
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBeDefined();
    });

    it("should fail when email is empty", async () => {
        const res = await request(app).post("/auth/signup").send({
            firstName: "Ash",
            lastName: "Ketchum",
            age: 12,
            email: "",
            password: "pikachu123",
            trainerType: "Player"
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBeDefined();
    });

    it("should fail when password is empty", async () => {
        const res = await request(app).post("/auth/signup").send({
            firstName: "Ash",
            lastName: "Ketchum",
            age: 12,
            email: "ash@test.com",
            password: "",
            trainerType: "Player"
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBeDefined();
    });

});