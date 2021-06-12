import express from 'express';
import { getMakes, getMakeModels } from '../controllers/makeController.js';

const router = express.Router();

router.route('/').get(getMakes);

router.get('/models/:make', getMakeModels);

export default router;
