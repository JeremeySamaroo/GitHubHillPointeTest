import express, { Request, Response } from "express";
import pokemonRoutes from "./routes/pokemon.Routes";
import authRoutes from "./routes/auth.Routes";
import characterInfoRoutes from "./routes/characterInfo.Routes";
import trainerRoutes from "./routes/trainer.Routes";
// import trainerProfileRoutes from "./routes/trainerProfile.Routes";



const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "GitHubHillPointeTest API is running",
    });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
    });
});



app.use("/auth", authRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/character-info", characterInfoRoutes);
app.use("/trainer", trainerRoutes);
// app.use("/trainer", trainerProfileRoutes);
export default app;