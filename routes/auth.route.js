import {Router} from 'express';
import { login ,register} from '../controllers/auth.controller.js';
import {validation,validationError} from '../middelwares/validationResultExpess.js';
const router = Router();

router.post('/login',validation,validationError,login);

 router.post('/register',validation,validationError,register);

 export default router;