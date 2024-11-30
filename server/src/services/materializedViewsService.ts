import { Actor } from '../db/sql/models/actor';
import { Movie } from '../db/sql/models/movie';
import { Character } from '../db/sql/models/character';
import { ActorMovieCharacter } from '../db/sql/models/actorMovieCharacter';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
} from '../../../shared/types';

//These are currently used exclusively for SQL raw data validation and are not used by the app.

export const fetchMoviesPerActor = async(): Promise<MoviesPerActorResponse> => {
    const actorMovies = await Actor.findAll({
      include: { model: Movie, through: { attributes: [] } },
    });

    const moviesPerActor: MoviesPerActorResponse = {};
    actorMovies.forEach((actor) => {
      const movieNames = actor.movies.map((movie) => movie.name);
      moviesPerActor[actor.name] = movieNames;
    });

    return moviesPerActor;
}

/**
 * Fetch actors with characters from the database.
 */
export const fetchActorsWithCharacters = async(): Promise<ActorsWithMultipleCharactersResponse> => {
    const actorCharacters = await ActorMovieCharacter.findAll({
      include: [
        { model: Actor },
        { model: Character },
        { model: Movie },
      ],
    });

    const actorsWithCharacters: ActorsWithMultipleCharactersResponse = {};
    actorCharacters.forEach((entry) => {
      const actorName = entry.actor.name;
      if (!actorsWithCharacters[actorName]) {
        actorsWithCharacters[actorName] = [];
      }
      actorsWithCharacters[actorName].push({
        movieName: entry.movie.name,
        characterName: entry.character.name,
      });
    });

    return actorsWithCharacters;
  }

/**
 * Fetch characters with actors from the database.
 */
export const fetchCharactersWithActors = async(): Promise<CharactersWithMultipleActorsResponse> =>{
    const characterActors = await ActorMovieCharacter.findAll({
        include: [
        { model: Actor },
        { model: Character },
        { model: Movie },
        ],
    });

    const charactersWithActors: CharactersWithMultipleActorsResponse = {};
    characterActors.forEach((entry) => {
        const characterName = entry.character.name;
        
        if (!charactersWithActors[characterName]) {
            charactersWithActors[characterName] = [];
        }
        
        charactersWithActors[characterName].push({
            movieName: entry.movie.name,
            actorName: entry.actor.name,
        });
    });

    return charactersWithActors;
}