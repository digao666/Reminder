import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/user/email/:email',authController.getemailandpass);
router.get('/user/:id',authController.getOneuser);
router.post('/user',authController.postuser);
router.get('/users',authController.selectAlluser);

export default router;