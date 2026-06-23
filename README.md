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
3) Checking logs of application
```agsl
docker logs postgress
or
docker logs node-express-app
or
docker logs pgadmin
or
docker logs flyway
```
4To run test in docker
```agsl
Step 1: 
run > docker exec -it node-express-app sh 
Step 2:
run > npm test

Alternatively:
run > docker exec -it node-express-app npm run test


```

## Executing Apis.
I have added a postman collection to make running more easy.

The first api can be used to create Player:
```agsl
API_Name: 005_HillPoint_Post_Test_CreateTrainerPlayerApi
API_URL: http://localhost:3000/auth/signup
API_BODY:
        {
          "firstName": "ash",
          "lastName": "Ketchum",
          "age": 12,
          "email": "ash1@pokemon.com",
          "password": "pikachu123",
          "trainerType": "Player"
        }
*Description*
This API is use to create a trainer, it requires and email for trainerType player, however for the 
other two types "NPC-Trainer" | "NPC-GYM-Leader" the email is not necessary.
*Examples*
{
  "firstName": "Asha",
  "lastName": "Ketchum",
  "age": 12,
  "email": "asha1@pokemon.com",
  "password": "pikachu123",
  "trainerType": "NPC-Trainer"
}

{
  "firstName": "Brock",
  "lastName": "Harrison.",
  "age": 12,
  "email": "Brock.Harrison@pokemon.com",
  "password": "onix123",
  "trainerType": "NPC-GYM-Leader"
}
```

The Second api can be used to login:
```agsl
API_Name: 008_HillPoint_Post_LoginApi
API_URL: http://localhost:3000/auth/login
API_BODY:
        {
           "email": "ash1@pokemon.com",
           "password": "pikachu123"
        }
*Description*
This API is used to login a trainer and return JWT token for that trainer.
It should automatically set the {{jwtToken}} 
in postman collection so authorized routes can be used.

```

The Third api can be used to create character information for Trainer, A trainer must have character information to
generate its team. This end point an authenticated endpoint user must be logged in to use.
```agsl
API_Name: 012_HillPoint_Post_Auth_CreateCharacterInfoApi
API_URL: http://localhost:3000/character-info/auth/createCharacterInfo
API_BODY:
        {
          "description": "Experienced Pokémon trainer from Pallet Town",
          "email": "ash1@pokemon.com",
          "trainerId": 0
           }
*Description*
A trainer must have character information to generate its team. This end point an authenticated endpoint user must
be logged in to use. To create a charcters Info, you must either use your email from when you create you trainer,
or the id whn the trainer was created. Based on the trainer types the app sets the Amount of pokemon a Trainer and
utilizes the auto generated level of trainer "NPC-Trainer" | "NPC-GYM-Leader" to determine the max amount of Pokemon 
they can have. If Trainer type is Player the Max can have is 6. 
```

The Fourt api is used to generate team for the differnt trainers with character info.
```agsl
API_Name: 013_HillPoint_Get_CheckTrainerandGenerateNewTeam
API_URL: http://localhost:3000/trainer/1
API_BODY:
        {
          
        }
*Description*
This API takes uses the players id in the url, it checks if the max amount of pokemon a trainer can have, and gereates
pokemon randomly from the pokemon api to make a players team giving each pokemon a random Level. Each time this API is
run the old team for that user if exist will be deleted and new team created.
```


The Fifth api is used to view all the moves of logged in players team
```agsl
API_Name: 014_HillPoint_Get_Auth_TrainerTeamInfoWithMoves
API_URL: http://localhost:3000/trainer/1/moves
API_BODY:
        {
          
        }
*Description*
This API takes uses the players id in the url, it checks if that is currently logged in player, and returns all the
moves for the team opf pokemon that player has. If the Provide is not that of the logged in play should throw and error
message.
```

The Sixth api is used to challenge a gym leader for a badge.
```agsl
API_Name: 015_HillPoint_Post_Auth_ChallengeGymLeader
API_URL: http://localhost:3000/trainer/challenge
 API_BODY:
        {
            "trainerIdentifier": 1,
            "gymLeaderIdentifier": 3
        }
*Description*
This API takes the player id of the logged in Trainer and an Id of gym leader to challge for a badge.
The Total level of players team of pokemon and gym leader is calculated if the player total pokemon level is greater
they win 
```

The Seveth api is used is to get the trainers Profil,
```agsl
API_Name: 016_HillPoint_GET_Auth_trainerProfileInfo
API_URL: http://localhost:3000/trainer/1/profile
 API_BODY:
        {
        }
*Description*
This API takes the player id in the url and retuns the information on trainer, its character info, the pokemon in its 
team and the badges earned.
```

The Eight api is used to log out
```agsl
API_Name: 010_HillPoint_Post_LogOutApi
API_URL: http://localhost:3000/auth/logout
 API_BODY:
        {
        }
*Description*
This API logs out the current user and balcklist there jwt token so it no longer valid.
```

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

