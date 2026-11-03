import { Router } from 'express';
import { getHealth, getDatabaseHealth } from '../controllers/healthController';
import { getVehicles, getVehicleById } from '../controllers/vehicleController';
import { getDealers } from '../controllers/dealerController';
import { getListings } from '../controllers/listingController';

const router = Router();

// Health routes
router.get('/health', getHealth);
router.get('/health/database', getDatabaseHealth);

// Core domain routes
router.get('/vehicles', getVehicles);
router.get('/vehicles/:id', getVehicleById);
router.get('/dealers', getDealers);
router.get('/listings', getListings);

export default router;
