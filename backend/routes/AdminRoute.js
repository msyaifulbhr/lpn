import  express from "express";
import  {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    checkemailadmin
} from "../controllers/Admin.js";
// import { verifyAdmin, adminOnly} from "../middleware/AuthAdmin.js";


const router = express.Router();

router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);
router.get('/admins/email/:email', checkemailadmin);
router.post('/admins',  createAdmin);
router.patch('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;