import {Router} from 'express';
import { infoUser, login ,register} from '../controllers/auth.controller.js';
import {validation,validationError} from '../middelwares/validationResultExpess.js';
import { requiereToken } from '../middelwares/validationToken.js';

const router = Router();

router.post('/login',validation,validationError,login);

 router.post('/register',validation,validationError,register);

 router.get('/protected',requiereToken,infoUser);

 export default router;