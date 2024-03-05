import  express from "express";
import  {
    getNews,
    getNewById,
    createNew,
    updateNew,
    deleteNew
} from "../controllers/News.js";
//import { verifyAdmin, adminOnly } from "../middleware/AuthAdmin.js";


const router = express.Router();

router.get('/news', getNews);
router.get('/news/:id', getNewById);
router.post('/news', createNew);
router.patch('/news/:id', updateNew);
router.delete('/news/:id', deleteNew);

export default router;