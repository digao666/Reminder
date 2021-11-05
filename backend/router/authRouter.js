import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/user',authController.getemailandpass)
router.get('/user/:id',authController.getOneuser);
router.post('/user',authController.postuser);

export default router;