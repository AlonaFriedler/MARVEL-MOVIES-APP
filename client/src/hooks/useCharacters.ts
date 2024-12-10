import { useFetchData, FetchDataResponse } from './useFetchData'
import { CharactersWithMultipleActorsResponse } from '../../../shared/types'
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const apiUrl = `${serverUrl}/api/actors/api/characters'`;

export const useCharactersWithMultipleActors = (): FetchDataResponse<CharactersWithMultipleActorsResponse> => {
  return useFetchData(`${apiUrl}/charactersWithMultipleActors`);
}