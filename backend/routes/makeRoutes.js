import express from 'express';
import { getMakes } from '../controllers/makeController.js';

const router = express.Router();

router.route('/').get(getMakes);

export default router;
