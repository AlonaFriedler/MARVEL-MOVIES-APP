import { ActorsWithMultipleCharactersResponse, CharactersWithMultipleActorsResponse, MoviesPerActorResponse } from '../../../shared/types';
import { setActorsWithMultipleCharacters, setCharactersWithMultipleActors, setMoviesPerActor } from '../db/noSql/materializedVieiws';
import { fetchMovieCredits } from './tmdbService'
import { Actor } from '../db/sql/models/actor';
import { Movie } from '../db/sql/models/movie';
import { ActorMovieCharacter } from '../db/sql/models/actorMovieCharacter';
import { initDb } from '../db/sql/dbSetup';
import { Character } from '../db/sql/models/character';

type MovieData = {
  [movieName: string]: number; // Maps movie name to its TMDB ID
}

// Sample movie data with movie names as keys and TMDB movie IDs as values
const moviesData: MovieData = {		
  "Fantastic Four (2005)": 9738,
  "Fantastic Four: Rise of the Silver Surfer": 1979,
  "Iron Man": 1726,
  "The Incredible Hulk": 1724,
  "Iron Man 2": 10138,
  "Thor": 10195,
  "Captain America: The First Avenger": 1771,
  "The Avengers": 24428,
  "Iron Man 3": 68721,
  "Thor: The Dark World": 76338,
  "Captain America: The Winter Soldier": 100402,
  "Guardians of the Galaxy": 118340,
  "Avengers: Age of Ultron": 99861,
  "Ant-Man": 102899,
  "Fantastic Four (2015)": 166424,
  "Captain America: Civil War": 271110,
  "Doctor Strange": 284052,
  "Guardians of the Galaxy Vol. 2": 283995,
  "Spider-Man: Homecoming": 315635,
  "Thor: Ragnarok": 284053,
  "Black Panther": 284054,
  "Avengers: Infinity War": 299536,
  "Ant-Man and the Wasp": 363088,
  "Captain Marvel": 299537,
  "Avengers: Endgame": 299534,
  "Spider-Man: Far From Home": 429617,
  "The Amazing Spider-Man": 1930,
};

//Actors sample data
const spesifiedActorsNames = new Set([
  "Robert Downey Jr.",
  "Chris Evans",
  "Mark Ruffalo",
  "Chris Hemsworth",
  "Scarlett Johansson",
  "Jeremy Renner",
  "Don Cheadle",
  "Paul Rudd",
  "Brie Larson",
  "Michael B. Jordan",
  "Karen Gillan",
  "Danai Gurira",
  "Josh Brolin",
  "Gwyneth Paltrow",
  "Bradley Cooper",
  "Tom Holland",
  "Zoe Saldana",
  "Anthony Mackie",
  "Tom Hiddleston",
  "Chris Pratt",
  "Black Panther",
  "Samuel L. Jackson",
  "Dave Bautista",
  "Andrew Garfield"
]);

export const acquisitAppData = async () => {

  const moviesPerActor: MoviesPerActorResponse = {};
  const actorsWithCharacters: ActorsWithMultipleCharactersResponse = {};
  const charactersWithActors: CharactersWithMultipleActorsResponse = {};

  initDb();

  for (const [movieName, movieId] of Object.entries(moviesData)) {
    try {
      // Fetch movie credits (cast data) from TMDB
      const credits = await fetchMovieCredits(movieId);
      
      const movie = await createMovie(movieName);

      for (const actor of credits) {
        if (spesifiedActorsNames.has(actor.name)) {   
          const actorRecord = await findOrCreateActor(actor);          
          const characterRecord = await findOrCreateCharacter(actor);  
          await createActorMovieCharacterRecord(actorRecord, movie, characterRecord);

          populateLocalDicts(moviesPerActor, actor, movieName, actorsWithCharacters, charactersWithActors); 
        }
      };
    } catch (error) {
      console.error(`Error processing movie: ${movieName}`, error);
    }
  }
  persistAsMaterializedViews(moviesPerActor, actorsWithCharacters, charactersWithActors);  
};

async function createMovie(movieName: string) {
  return await Movie.create({ name: movieName });
}

async function findOrCreateCharacter(actor: { id: number; name: string; character: string; }) {
  return await Character.findOrCreate({
    where: { name: actor.character },
  }).then(([actor]) => actor);
}

async function findOrCreateActor(actor: { id: number; name: string; character: string; }) {
  return await Actor.findOrCreate({
    where: { name: actor.name },
  }).then(([actor]) => actor);
}

async function createActorMovieCharacterRecord(actorRecord: Actor, movie: Movie, characterRecord: Character) {
  await ActorMovieCharacter.create({
    actorId: actorRecord.id,
    movieId: movie.id,
    characterId: characterRecord.id,
  });
}

function populateLocalDicts(moviesPerActor: MoviesPerActorResponse, actor: { id: number; name: string; character: string; }, movieName: string, actorsWithCharacters: ActorsWithMultipleCharactersResponse, charactersWithActors: CharactersWithMultipleActorsResponse) {
  if (moviesPerActor[actor.name]) {
    moviesPerActor[actor.name].push(movieName);
  } else {
    moviesPerActor[actor.name] = [movieName];
  }

  if (!actorsWithCharacters[actor.name]) {
    actorsWithCharacters[actor.name] = [];
  }
  actorsWithCharacters[actor.name].push({
    movieName,
    characterName: actor.character,
  });

  if (!charactersWithActors[actor.character]) {
    charactersWithActors[actor.character] = [];
  }

  charactersWithActors[actor.character].push({
    movieName,
    actorName: actor.name,
  });
}

function persistAsMaterializedViews(
  moviesPerActor: MoviesPerActorResponse,
  actorsWithCharacters: ActorsWithMultipleCharactersResponse,
  charactersWithActors: CharactersWithMultipleActorsResponse
) {
  //Apply filtering
  const {
    filteredActorsWithMultipleCharacters,
    filteredCharactersWithMultipleActors,
  } = filterData(actorsWithCharacters, charactersWithActors);
  
  // Persist data
  setMoviesPerActor(moviesPerActor);
  setActorsWithMultipleCharacters(filteredActorsWithMultipleCharacters);
  setCharactersWithMultipleActors(filteredCharactersWithMultipleActors);
}

function filterData(
  actorsWithCharacters: ActorsWithMultipleCharactersResponse,
  charactersWithActors: CharactersWithMultipleActorsResponse
) {
  const filteredActorsWithMultipleCharacters = filterByDistinctValues(
    actorsWithCharacters,
    (item) => item.characterName, 
    2 // Minimum distinct characters
  );

  const filteredCharactersWithMultipleActors = filterByDistinctValues(
    charactersWithActors,
    (item) => item.actorName, 
    2 // Minimum distinct actors
  );

  return {
    filteredActorsWithMultipleCharacters,
    filteredCharactersWithMultipleActors,
  };
}

function filterByDistinctValues<T>(
  data: { [key: string]: T[] },
  valueExtractor: (item: T) => string,
  minDistinctCount: number
): { [key: string]: T[] } {
  const filteredData: { [key: string]: T[] } = {};

  for (const [key, list] of Object.entries(data)) {
    const distinctValues = new Set(list.map(valueExtractor));
    if (distinctValues.size >= minDistinctCount) {
      filteredData[key] = list;
    }
  }

  return filteredData;
}
