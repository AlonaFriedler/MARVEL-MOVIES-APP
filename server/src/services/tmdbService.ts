import axios from "axios";
//TMDB types since they dont have a formal npm package that supports ts
type TmdbMovieId = number
type TmdbPersonId = number
type TbdbCast = {
  id: TmdbPersonId
  name: string;
  character: string;
}
type TmdbMovieCreditsResponse = {
  cast: TbdbCast[];
}
type TmbdMovie = {
  id: TmdbMovieId;
  title: string;
  overview: string;
  release_date: string;
}

export type FetchMovieCreditsResponse = TmdbMovieCreditsResponse["cast"];

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'; 
// TODO replace with some secret manager fetch 
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in the .env file");
}

// Fetch cast details for a given movie
//TODO Add smarter error handling and retry mechanizem. Also, rate limits managment
export const fetchMovieCredits = async (movieId: TmdbMovieId): Promise<FetchMovieCreditsResponse> => {
  try {
    const response = await axios.get<TmdbMovieCreditsResponse>(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    throw error;
  }
};