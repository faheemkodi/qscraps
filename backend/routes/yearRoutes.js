import express from 'express';
import { getYears } from '../controllers/yearController.js';

const router = express.Router();

router.route('/').get(getYears);

export default router;
