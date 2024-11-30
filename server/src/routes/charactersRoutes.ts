import { Router } from 'express';
import { getCharactersWithMultipleActors } from '../controllers/charactersController';

const router = Router();

// Route for Characters With Multiple Actors API
router.get('/charactersWithMultipleActors', getCharactersWithMultipleActors);

export default router;
