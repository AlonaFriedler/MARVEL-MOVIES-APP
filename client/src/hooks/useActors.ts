import { MoviesPerActorResponse, ActorsWithMultipleCharactersResponse } from '../../../shared/types'
import { useFetchData, FetchDataResponse } from './useFetchData'
const API_URL = 'http://localhost:5000/api/actors';  // TODO Replace with env variable

export const useMoviePerActor = (): FetchDataResponse<MoviesPerActorResponse> => {
  return useFetchData(`${API_URL}/moviesPerActor`);
}

export const useActorsWithMultipleCharacters = (): FetchDataResponse<ActorsWithMultipleCharactersResponse> => {
  return useFetchData(`${API_URL}/actorsWithMultipleCharacters`);
}