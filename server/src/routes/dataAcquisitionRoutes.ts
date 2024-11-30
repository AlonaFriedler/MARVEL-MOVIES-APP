import { Router } from 'express';
import { triggerDataAcquisition } from '../controllers/dataAcquisitionController';
import { getCharactersWithActorsFromDb, getActorsWithCharactersFromDb, getMoviesPerActorFromDb } from '../controllers/materializedViewsController';

const router = Router();

router.get('/triggerDataAcquisition', triggerDataAcquisition);

//These are currently used exclusively for SQL raw data validation and are not used by the app.
router.get('/getCharactersWithActorsFromDb', getCharactersWithActorsFromDb);
router.get('/getActorsWithCharactersFromDb', getActorsWithCharactersFromDb);
router.get('/getMoviesPerActorFromDb', getMoviesPerActorFromDb);

export default router;
