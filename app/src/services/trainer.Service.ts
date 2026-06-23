
import { TrainerRepository } from "../repositories/trainer.Repository"
import {Trainer} from "../models/trainer.Model";

export type TrainerResult = {
    trainer_id: number;
    trainer_type: string;
    character_info: {
        description: string;
        current_level: number;
        amount_of_pokemon_can_have: number;
    } | null;
};

export class TrainerService {
    constructor(private repo: TrainerRepository) {}

    async getTrainerByIdentifier(identifier: string): Promise<TrainerResult | null> {
        const isId = /^\d+$/.test(identifier);

        // 1. Fetch trainer from repository
        const trainer = isId
            ? await this.repo.findTrainerById(Number(identifier))
            : await this.repo.findTrainerByEmail(identifier);

        if (!trainer) return null;

        // 2. Fetch character info from repository
        const characterInfo = await this.repo.findCharacterInfoByTrainerId(
            trainer.id
        );

        return {
            trainer_id: trainer.id,
            trainer_type: trainer.trainer_type,
            character_info: characterInfo,
        };
    }


}