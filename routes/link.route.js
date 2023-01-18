import {Router} from 'express'
import { createLink, getLink, getLinks, removeLink,updateLink } from '../controllers/link.controller.js';
import { bodyLinkValidator } from '../middelwares/validationResultExpess.js';
import { requiereToken } from '../middelwares/validationToken.js';

const router = Router();

//GET       /api/v1/links             all links     
//GET       /api/v1/links/:id         single link
//POST      /api/v1/links             create link
//PATCH    /api/v1/links/:id          update link
//DELETE  /api/v1/links/:id           delete link


router.get('/',requiereToken,getLinks);

router.get('/:id',requiereToken,getLink);

router.post('/',requiereToken,bodyLinkValidator,createLink);

router.delete('/:id',requiereToken,removeLink);
router.patch('/:id',requiereToken,bodyLinkValidator,updateLink);



export default router;