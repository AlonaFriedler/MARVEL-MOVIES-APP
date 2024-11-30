import { useFetchData, FetchDataResponse } from './useFetchData'
import { CharactersWithMultipleActorsResponse } from '../../../shared/types'
const API_URL = 'http://localhost:5000/api/characters';  // TODO Replace with env variable

export const useCharactersWithMultipleActors = (): FetchDataResponse<CharactersWithMultipleActorsResponse> => {
  return useFetchData(`${API_URL}/charactersWithMultipleActors`);
}