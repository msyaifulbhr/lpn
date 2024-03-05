import  express from "express";
import  {
    getAbouts,
    getAboutById,
    createAbout,
    updateAbout,
    deleteAbout
} from "../controllers/Abouts.js";
// import { verifyAdmin } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/abouts',  getAbouts);
router.get('/abouts/:id',  getAboutById);
router.post('/abouts', createAbout);
router.patch('/abouts/:id', updateAbout);
router.delete('/abouts/:id', deleteAbout);

export default router;