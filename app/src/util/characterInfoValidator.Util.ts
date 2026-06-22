import { CharacterInfo } from "../models/characterInfo.Model";

export function validateCharacterInfo(
    characterInfo: CharacterInfo
): string | null {

    if (!characterInfo.description?.trim()) {
        return "Description is required";
    }

    if (characterInfo.currentLevel < 1 || characterInfo.currentLevel > 100) {
        return "Current level must be greater than 0 and less than 100";
    }

    if (characterInfo.amountOfPokemonCanHave < 1 || characterInfo.amountOfPokemonCanHave > 6 ) {
        return "Amount of Pokemon must be greater than 0 and less than 7";
    }

    if (!characterInfo.trainerId) {
        return "Trainer Id is required";
    }

    return null;
}