export interface Trainer {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    trainerType: "Player" | "NPC-Trainer" | "NPC-GYM-Leader";
}