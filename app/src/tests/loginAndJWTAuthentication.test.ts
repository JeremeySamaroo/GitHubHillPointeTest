import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

describe("POST /auth/login", () => {

    it("should return JWT token for valid credentials", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "ash1@pokemon.com",
                password: "pikachu123"
            });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(typeof res.body.token).toBe("string");
    });

    it("should fail login with incorrect password", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "ash1@pokemon.com",
                password: "wrongpassword"
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    });

    it("should fail login with unknown email", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "unknown@pokemon.com",
                password: "pikachu123"
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    });

});


describe("POST /auth/login - JWT validation", () => {

    it("should return a valid JWT token", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "ash1@pokemon.com",
                password: "pikachu123"
            });

        // 1. Check response
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();

        const token = res.body.token;

        // 2. Verify JWT structure + signature
        const decoded = jwt.verify(token, JWT_SECRET);

        expect(decoded).toBeDefined();
        expect(typeof decoded).toBe("object");

        // 3. Check payload contains expected fields
        expect((decoded as any).email).toBe("ash1@pokemon.com");
        expect((decoded as any).id).toBeDefined();
    });

});