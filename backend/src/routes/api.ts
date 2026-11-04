import { Router } from 'express';
import { getHealth, getDatabaseHealth } from '../controllers/healthController';
import {
  register,
  login,
  getMe,
  updateProfile,
} from '../controllers/authController';
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
import {
  getDealers,
  getDealerById,
  getDealerDashboard,
  getDealerLeads,
  updateLeadStatus,
  updateDealerProfile,
} from '../controllers/dealerController';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getComparisons,
  addComparison,
  removeComparison,
  getSavedSearches,
  createSavedSearch,
  deleteSavedSearch,
  createInquiry,
  getBuyerInquiries,
} from '../controllers/buyerController';
import {
  getAdminDashboard,
  getAdminUsers,
  updateAdminUserStatus,
  updateDealerVerification,
  moderateListing,
  getAdminReports,
  resolveReport,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/adminController';
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

// 2. Auth Endpoints
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authenticate, getMe);
router.patch('/auth/profile', authenticate, updateProfile);

// 3. Vehicle Endpoints
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

// 4. Listing Endpoints
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

// 5. User Listings (Self)
router.get('/users/me/listings', authenticate, getMyListings);

// 6. Buyer Features
router.get('/buyer/favorites', authenticate, getFavorites);
router.post('/buyer/favorites', authenticate, addFavorite);
router.delete('/buyer/favorites/:listingId', authenticate, removeFavorite);

router.get('/buyer/comparisons', authenticate, getComparisons);
router.post('/buyer/comparisons', authenticate, addComparison);
router.delete('/buyer/comparisons/:listingId', authenticate, removeComparison);

router.get('/buyer/saved-searches', authenticate, getSavedSearches);
router.post('/buyer/saved-searches', authenticate, createSavedSearch);
router.delete('/buyer/saved-searches/:id', authenticate, deleteSavedSearch);

router.post('/inquiries', createInquiry);
router.get('/buyer/inquiries', authenticate, getBuyerInquiries);

// 7. Dealer Portal Endpoints
router.get('/dealers', getDealers);
router.get('/dealers/:id', getDealerById);
router.get('/dealer/dashboard', authenticate, authorizeRoles('dealer', 'admin'), getDealerDashboard);
router.get('/dealer/leads', authenticate, authorizeRoles('dealer', 'admin'), getDealerLeads);
router.patch('/dealer/leads/:id', authenticate, authorizeRoles('dealer', 'admin'), updateLeadStatus);
router.patch('/dealer/profile', authenticate, authorizeRoles('dealer', 'admin'), updateDealerProfile);

// 8. Admin Portal Endpoints
router.get('/admin/dashboard', authenticate, authorizeRoles('admin'), getAdminDashboard);
router.get('/admin/users', authenticate, authorizeRoles('admin'), getAdminUsers);
router.patch('/admin/users/:id/status', authenticate, authorizeRoles('admin'), updateAdminUserStatus);
router.patch('/admin/dealers/:id/verification', authenticate, authorizeRoles('admin'), updateDealerVerification);
router.patch('/admin/listings/:id/moderate', authenticate, authorizeRoles('admin'), moderateListing);
router.get('/admin/reports', authenticate, authorizeRoles('admin'), getAdminReports);
router.patch('/admin/reports/:id/resolve', authenticate, authorizeRoles('admin'), resolveReport);

// 9. Brands
router.get('/brands', getBrands);
router.post('/brands', authenticate, authorizeRoles('admin'), createBrand);
router.patch('/brands/:id', authenticate, authorizeRoles('admin'), updateBrand);
router.delete('/brands/:id', authenticate, authorizeRoles('admin'), deleteBrand);

// 10. Media / S3 Upload Presigned URL
router.post('/media/upload-url', authenticate, generateUploadUrl);

export default router;
