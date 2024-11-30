export interface MoviesPerActorResponse {
    [actorName: string]: string[];
  }
  
  export interface ActorsWithMultipleCharactersResponse {
    [actorName: string]: { movieName: string; characterName: string }[];
  }
  
  export interface CharactersWithMultipleActorsResponse {
    [characterName: string]: { movieName: string; actorName: string }[];
  }