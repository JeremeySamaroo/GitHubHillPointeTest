# 🔪 Technical Test: PokeAPI Extension (Node.js + Express + TypeScript)

Welcome to the technical assessment! This test is designed to evaluate your backend development skills, including API design, external API integration, TypeScript usage, and code quality. You'll be building an API that interacts with the public [PokeAPI](https://pokeapi.co/) and extends it with your own functionality.

---

## 📋 Objective

Create an Express-based Node.js API application (written in TypeScript) that fetches data from the public [PokeAPI](https://pokeapi.co/) and extends it with additional logic, data aggregation, or derived features.

This is a backend-only challenge – no frontend is required.

---

## 🧠 Requirements

Your API must:

1. Be built with **Node.js**, **Express**, and **TypeScript**.
2. Interact with the [PokeAPI](https://pokeapi.co/) using `axios` or another HTTP client.
3. Interact with a local database (In memory or instance) which holds your custom models, which can be linked wtih PokeAPI data. Example:
    * Trainer/ NPC information
        * Manage a team of Pokémon
        * Assign Gym badges
    * Gym's. Which can contain NPC's with certain Pokémon.
4. The Trainer interactions should be done via Authenticated routes.
    * No need for anything complex but a simple Username, password authentication. Returning a token or JWT.
    * Some of the routes should be locked down correctly behind authentication checks, for example:
        * A trainer should be able to see their team information only.
5. Include **input validation** and **error handling**.
6. Be well-structured and easy to read and extend.
7. Include **basic unit tests** for key services or logic.
8. Include a **README.md** (this file) with instructions.

---

## 🧪 Testing

You should include a few basic tests using any test framework (`jest` preferred).

---

## 🛠 Tech Stack

* [x] Node.js
* [x] Express
* [x] TypeScript
* [x] MySQL (optional, can use an in memory cache or another DB Engine)
* [x] Axios
* [x] Jest (or another testing library)

Optional (for bonus points):

* Use a simple **dependency injection** pattern or structure.
* Use a caching mechanism like `node-cache` or `redis`.
* Add OpenAPI (Swagger) documentation.
* Password checks done with Bcrypt using Hashed values
* ESLint + Prettier
* Husky for pre-commit hooks
* GitHub actions for validating code when raising a pull request (ESLint + Prettier)

---

## 🫼 Code Quality

We expect clean, modular code with proper use of TypeScript types and interfaces. Favor readability and maintainability over premature optimization.
The data structure is completely up to you, they can be as basic as needed or include extra information if you'd like but there should be no pressure to build out too many data points.

---

## ✅ Submission

Please provide:

1. A link to your GitHub/GitLab repo (public or private with access granted).
2. Instructions on how to run and test the application (if not covered in this README).

---

## 🙌 Good Luck!

This challenge is meant to highlight your strengths – show off your clean code, design patterns, and backend skills. We’re not looking for pixel-perfect results, but a clear demonstration of your technical ability and thought process.

Happy coding!


## Project Setup Info
The application is built to run on docker. To Run application, install docker and its daemon.
Once Docker is installed run the following command:

1) Setup and Start application:
```agsl
docker compose up --build -d
```
2) Stop application destroy run environment:
```agsl
docker compose down -v
```

