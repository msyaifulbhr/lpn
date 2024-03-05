import  express from "express";
import  {
    getHeros,
    getHeroById,
    createHero,
    updateHero,
    deleteHero
} from "../controllers/Heros.js";


const router = express.Router();

router.get('/heros', getHeros);
router.get('/heros/:id', getHeroById);
router.post('/heros', createHero);
router.patch('/heros/:id', updateHero);
router.delete('/heros/:id', deleteHero);

export default router;