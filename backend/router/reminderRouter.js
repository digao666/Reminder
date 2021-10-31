import express from 'express';
import * as reminderController from '../controllers/reminderController.js';

const router = express.Router();
router.get('/:userid',reminderController.getAllreminders );

router.get('/:userid/:reminderid',reminderController.getOnereminders);
router.post('/:userid',reminderController.Createreminders);
router.put('/:userid/:reminderid',reminderController.Updatereminders );
router.delete('/:userid/:reminderid',reminderController.Deletereminders);

export default router;