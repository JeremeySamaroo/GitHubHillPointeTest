CREATE TABLE character_info (
                                id SERIAL PRIMARY KEY,
                                description TEXT NOT NULL,
                                current_level INTEGER NOT NULL,
                                amount_of_pokemon_can_have INTEGER NOT NULL,
                                trainer_id INTEGER NOT NULL UNIQUE,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                                CONSTRAINT fk_trainer
                                    FOREIGN KEY (trainer_id)
                                        REFERENCES trainers(id)
                                        ON DELETE CASCADE
);