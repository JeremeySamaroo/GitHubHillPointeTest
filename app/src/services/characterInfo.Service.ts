import {createCharacterInfo} from "../repositories/characterInfo.Repository";
import {validateCharacterInfo} from "../util/characterInfoValidator.Util";
import {randomNumber} from "../util/randomNumberGenerator.Util";
import { CharacterInfo } from "../models/characterInfo.Model";
import { findByEmail, findById } from "../repositories/trainer.Repository";
export async function createCharacter(characterInfo: CharacterInfo) {

    console.log(characterInfo.email);
    var trainer;
    if(!characterInfo.email || characterInfo.email.trim() === ""){
        trainer = await findById(characterInfo.trainerId)
        console.log("If: ")
        console.log(trainer);
    }else{
        trainer = await findByEmail(characterInfo.email.trim());
        console.log("Else");
        console.log(trainer)
    }

    let validationError = null;
    if(trainer.trainer_type === "Player"){
        console.log("Entering Player character info setup if.");
        characterInfo.currentLevel = randomNumber(1,100);
        characterInfo.amountOfPokemonCanHave = 6;
        characterInfo.trainerId = trainer.id
    }else{
        console.log("Entering Player character info setup else.");
        characterInfo.currentLevel = randomNumber(1,100);
        characterInfo.trainerId = trainer.id
        if(characterInfo.currentLevel < 25){
            characterInfo.amountOfPokemonCanHave = randomNumber(1,3)
        }else{
            if(characterInfo.currentLevel > 25 || characterInfo.currentLevel < 50){
                characterInfo.amountOfPokemonCanHave = randomNumber(3,5)
            }else{
                if(characterInfo.currentLevel>50 ){
                    characterInfo.amountOfPokemonCanHave = randomNumber(2,6)
                }
                if(characterInfo.currentLevel > 50 && trainer.trainerType === "NPC-GYM-Leader"){
                    characterInfo.amountOfPokemonCanHave = randomNumber(4,6)
                }
            }
        }
    }

    console.log("After if Else: ");
    console.log(characterInfo);

    validationError = validateCharacterInfo(characterInfo);

    if (validationError) {
        throw new Error(validationError);
    }


    return createCharacterInfo(characterInfo);
    // return null;
}