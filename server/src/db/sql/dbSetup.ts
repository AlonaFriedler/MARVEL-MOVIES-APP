import { Sequelize } from 'sequelize-typescript';
import { Actor } from './models/actor';
import { Movie } from './models/movie';
import { Character } from './models/character';
import { ActorMovieCharacter } from './models/actorMovieCharacter';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // In-memory database
  logging: true,
});

// Register Models
sequelize.addModels([Actor, Movie, Character, ActorMovieCharacter]);

export const initDb = async () => {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ force: true });
    console.log('Tables created successfully.');  
};