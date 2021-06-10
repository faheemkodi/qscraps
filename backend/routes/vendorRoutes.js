import express from 'express';
const router = express.Router();
import {
  authVendor,
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getVendors,
  deleteVendor,
  getVendorById,
  updateVendor,
} from '../controllers/vendorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerVendor).get(protect, admin, getVendors);
router.post('/login', authVendor);
router
  .route('/profile')
  .get(protect, getVendorProfile)
  .put(protect, updateVendorProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteVendor)
  .get(protect, admin, getVendorById)
  .put(protect, admin, updateVendor);

export default router;
