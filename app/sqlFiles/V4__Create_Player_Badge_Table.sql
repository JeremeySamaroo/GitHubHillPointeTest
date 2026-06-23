CREATE TABLE player_badges (
                               id SERIAL PRIMARY KEY,
                               badge_name VARCHAR(255) NOT NULL,
                               trainer_id INTEGER NOT NULL,

                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_player_badges_trainer
                                   FOREIGN KEY (trainer_id)
                                       REFERENCES trainers(id)
                                       ON DELETE CASCADE
);