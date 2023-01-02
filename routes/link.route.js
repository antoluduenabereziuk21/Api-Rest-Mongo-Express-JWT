import {Router} from 'express'
import { getLinks } from '../controllers/link.controller.js';
import { requiereToken } from '../middelwares/validationToken.js';

const router = Router();

//GET       /api/v1/links             all links     
//GET       /api/v1/links/:id         single link
//POST      /api/v1/links             create link
//PATCH    /api/v1/links/:id          update link
//DELETE  /api/v1/links/:id           delete link


router.get('/',requiereToken,getLinks);



export default router;