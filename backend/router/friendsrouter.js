import express from 'express';
import * as friendController from '../controllers/friendController.js';

const router = express.Router();

router.get('/',friendController.getallfriends);
router.post('/',friendController.createfriend);


export default router;