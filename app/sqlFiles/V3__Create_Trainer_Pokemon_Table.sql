CREATE TABLE player_pokemon (
    id SERIAL PRIMARY KEY,
    pokemon_id INTEGER NOT NULL,
    pokemon_name VARCHAR(100) NOT NULL,
    trainer_id INTEGER NOT NULL, level INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_player_pokemon_trainer FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE );