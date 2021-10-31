import express from 'express';
import * as errorController from '../controllers/errorController.js';

const router = express.Router();

router.use(errorController.pageNotFound);

router.use(errorController.serverError);

export default router;