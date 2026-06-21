import express, { Request, Response } from "express";

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

export default app;