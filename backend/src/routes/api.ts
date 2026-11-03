import { Router } from 'express';
import { getHealth, getDatabaseHealth } from '../controllers/healthController';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  updateListingStatus,
  deleteListing,
  getMyListings,
} from '../controllers/listingController';
import { getDealers } from '../controllers/dealerController';
import { generateUploadUrl } from '../controllers/imageController';
import { authenticate, authorizeRoles, validateObjectIdParam } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import {
  CreateVehicleSchema,
  UpdateVehicleSchema,
  CreateListingSchema,
  UpdateListingSchema,
  UpdateListingStatusSchema,
} from '../validators/schemas';

const router = Router();

// 1. Health Endpoints
router.get('/health', getHealth);
router.get('/health/database', getDatabaseHealth);

// 2. Vehicle Endpoints
router.get('/vehicles', getVehicles);
router.get('/vehicles/:id', validateObjectIdParam('id'), getVehicleById);
router.post(
  '/vehicles',
  authenticate,
  authorizeRoles('dealer', 'admin'),
  validateRequest(CreateVehicleSchema),
  createVehicle
);
router.patch(
  '/vehicles/:id',
  authenticate,
  authorizeRoles('dealer', 'admin'),
  validateObjectIdParam('id'),
  validateRequest(UpdateVehicleSchema),
  updateVehicle
);
router.delete(
  '/vehicles/:id',
  authenticate,
  authorizeRoles('admin'),
  validateObjectIdParam('id'),
  deleteVehicle
);

// 3. Listing Endpoints
router.get('/listings', getListings);
router.get('/listings/:id', validateObjectIdParam('id'), getListingById);
router.post(
  '/listings',
  authenticate,
  validateRequest(CreateListingSchema),
  createListing
);
router.patch(
  '/listings/:id',
  authenticate,
  validateObjectIdParam('id'),
  validateRequest(UpdateListingSchema),
  updateListing
);
router.patch(
  '/listings/:id/status',
  authenticate,
  validateObjectIdParam('id'),
  validateRequest(UpdateListingStatusSchema),
  updateListingStatus
);
router.delete(
  '/listings/:id',
  authenticate,
  validateObjectIdParam('id'),
  deleteListing
);

// 4. User Listings
router.get('/users/me/listings', authenticate, getMyListings);

// 5. Dealer Endpoints
router.get('/dealers', getDealers);

// 6. Media / Image Upload Presigned URL
router.post('/media/upload-url', authenticate, generateUploadUrl);

export default router;
