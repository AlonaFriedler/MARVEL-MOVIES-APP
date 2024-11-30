import { Request, Response } from 'express';
import { getCharactersWithMultipleActors as getCharactersWithMultipleActorsFromMem } from '../db/noSql/materializedVieiws';

export const getCharactersWithMultipleActors = async (req: Request, res: Response) => {
  try {
    res.status(200).json(getCharactersWithMultipleActorsFromMem());
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
