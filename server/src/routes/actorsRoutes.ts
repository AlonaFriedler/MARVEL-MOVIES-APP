import { Router } from 'express';
import { getMoviesPerActor, getActorsWithMultipleCharacters } from '../controllers/actorsController';

const router = Router();

// Route for Movies Per Actor API
router.get('/moviesPerActor', getMoviesPerActor);

// Route for Actors With Multiple Characters API
router.get('/actorsWithMultipleCharacters', getActorsWithMultipleCharacters);

export default router;
