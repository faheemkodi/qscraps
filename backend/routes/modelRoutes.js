import express from 'express';
import { getModels } from '../controllers/modelController.js';

const router = express.Router();

router.route('/').get(getModels);

export default router;
