import {Router} from 'express';
import { infoUser, login ,register, refreshToken, logout} from '../controllers/auth.controller.js';
import { requiereRefreshToken } from '../middelwares/requiereRefreshToken.js';
import {validation} from '../middelwares/validationResultExpess.js';
import { requiereToken } from '../middelwares/validationToken.js';

const router = Router();

router.post('/login',validation,login);

 router.post('/register',validation,register);

 router.get('/protected',requiereToken,infoUser);

 router.get('/refresh',requiereRefreshToken,refreshToken);

 router.get('/logout',logout);

 export default router;