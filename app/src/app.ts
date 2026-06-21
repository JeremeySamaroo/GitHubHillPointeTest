import express, { Request, Response } from "express";
import pokemonRoutes from "./routes/pokemon.routes";
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


app.use("/pokemon", pokemonRoutes);
export default app;