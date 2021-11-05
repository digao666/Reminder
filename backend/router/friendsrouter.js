import express from 'express';
import * as friendController from '../controllers/friendController.js';

const router = express.Router();

router.get('/:userid',friendController.getallfriends);
router.post('/:userid',friendController.createfriend);


export default router;