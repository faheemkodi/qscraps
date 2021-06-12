import express from 'express';
import {
  getListings,
  getListingById,
  getMyListings,
  deleteListing,
  createListing,
  updateListing,
} from '../controllers/listingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getListings).post(protect, createListing);

router.route('/mylistings').get(protect, getMyListings);

router
  .route('/:id')
  .get(getListingById)
  .delete(protect, deleteListing)
  .put(protect, updateListing);

export default router;
