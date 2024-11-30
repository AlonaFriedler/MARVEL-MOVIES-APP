import { Request, Response } from 'express';
import { fetchCharactersWithActors, fetchActorsWithCharacters, fetchMoviesPerActor } from '../services/materializedViewsService';

//These are currently used exclusively for SQL raw data validation and are not used by the app.

export const getCharactersWithActorsFromDb = async (req: Request, res: Response) => {
    try {
      res.status(200).json(await fetchCharactersWithActors());
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getActorsWithCharactersFromDb = async (req: Request, res: Response) => {
    try {
      res.status(200).json(await fetchActorsWithCharacters());
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getMoviesPerActorFromDb = async (req: Request, res: Response) => {
    try {
      res.status(200).json(await fetchMoviesPerActor());
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };