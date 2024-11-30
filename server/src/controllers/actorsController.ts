import { Request, Response } from 'express';
import { getActorsWithMultipleCharacters as getActorsWithMultipleCharactersFromMem} from '../db/noSql/materializedVieiws';
import { getMoviesPerActor as getMoviesPerActorFromMem} from '../db/noSql/materializedVieiws';

export const getMoviesPerActor = async (req: Request, res: Response) => {
  try {
    res.status(200).json(getMoviesPerActorFromMem());
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getActorsWithMultipleCharacters = async (req: Request, res: Response) => {
  try {
    res.status(200).json(getActorsWithMultipleCharactersFromMem());
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
