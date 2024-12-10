import { MoviesPerActorResponse, ActorsWithMultipleCharactersResponse } from '../../../shared/types'
import { useFetchData, FetchDataResponse } from './useFetchData'
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const apiUrl = `${serverUrl}/api/actors`;

export const useMoviePerActor = (): FetchDataResponse<MoviesPerActorResponse> => {
  return useFetchData(`${apiUrl}/moviesPerActor`);
}

export const useActorsWithMultipleCharacters = (): FetchDataResponse<ActorsWithMultipleCharactersResponse> => {
  return useFetchData(`${apiUrl}/actorsWithMultipleCharacters`);
}