import { ActorsWithMultipleCharactersResponse, CharactersWithMultipleActorsResponse, MoviesPerActorResponse } from '../../../../shared/types';

// Mocks a no-sql in memory DB for materialized views
let MOVIES_PER_ACTOR: MoviesPerActorResponse = {};
let ACTORS_WITH_MULTIPLE_CHARACTERS: ActorsWithMultipleCharactersResponse = {};
let CHARACTERS_WITH_MULTIPLE_ACTORS: CharactersWithMultipleActorsResponse = {};

export const setMoviesPerActor = (moviesPerActor: MoviesPerActorResponse) => {
    MOVIES_PER_ACTOR = moviesPerActor;
};

export const setActorsWithMultipleCharacters = (actorsWithMultipleCharacters: ActorsWithMultipleCharactersResponse) => {
    ACTORS_WITH_MULTIPLE_CHARACTERS = actorsWithMultipleCharacters;
};

export const setCharactersWithMultipleActors = (charactersWithMultipleActors: CharactersWithMultipleActorsResponse) => {
    CHARACTERS_WITH_MULTIPLE_ACTORS = charactersWithMultipleActors;
};

export const getMoviesPerActor = (): MoviesPerActorResponse => {
    return MOVIES_PER_ACTOR;
  };
  
  export const getActorsWithMultipleCharacters = (): ActorsWithMultipleCharactersResponse => {
    return ACTORS_WITH_MULTIPLE_CHARACTERS;
  };
  
  export const getCharactersWithMultipleActors = (): CharactersWithMultipleActorsResponse => {
    return CHARACTERS_WITH_MULTIPLE_ACTORS;
  };
  
  