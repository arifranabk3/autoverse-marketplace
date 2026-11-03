import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { Vehicle } from '../src/models/Vehicle';
import { Listing } from '../src/models/Listing';
import { User } from '../src/models/User';

let mongoServer: MongoMemoryServer;

const JWT_SECRET = 'autoverse_enterprise_jwt_super_secret_key_2026';

function generateToken(userId: string, email: string, role: 'buyer' | 'dealer' | 'admin'): string {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '1h' });
}

let buyerId: string;
let buyerToken: string;
let dealerId: string;
let dealerToken: string;
let adminId: string;
let adminToken: string;
let testVehicleId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: 'autoverse' },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: 'autoverse' });

  // Create users
  const buyer = await User.create({
    name: 'Julian Buyer',
    email: 'buyer@test.com',
    passwordHash: 'hashed123',
    role: 'buyer',
  });
  buyerId = buyer._id.toString();
  buyerToken = generateToken(buyerId, buyer.email, 'buyer');

  const dealer = await User.create({
    name: 'Apex Showroom',
    email: 'dealer@test.com',
    passwordHash: 'hashed123',
    role: 'dealer',
  });
  dealerId = dealer._id.toString();
  dealerToken = generateToken(dealerId, dealer.email, 'dealer');

  const admin = await User.create({
    name: 'Super Admin',
    email: 'admin@test.com',
    passwordHash: 'hashed123',
    role: 'admin',
  });
  adminId = admin._id.toString();
  adminToken = generateToken(adminId, admin.email, 'admin');
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('PHASE 03: Vehicle & Listing Modules Comprehensive Test Suite', () => {
  // Test 1: Vehicle Creation (RBAC Protected)
  it('1. POST /api/v1/vehicles should fail without token (401)', async () => {
    const res = await request(app).post('/api/v1/vehicles').send({
      make: 'Porsche',
      model: '911 GT3 RS',
      year: 2024,
      bodyType: 'Coupe',
      fuelType: 'Petrol',
      transmission: 'Dual-Clutch',
      mileage: 1200,
    });
    expect(res.status).toBe(401);
  });

  it('2. POST /api/v1/vehicles should fail for buyer role (403 Forbidden)', async () => {
    const res = await request(app)
      .post('/api/v1/vehicles')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({
        make: 'Porsche',
        model: '911 GT3 RS',
        year: 2024,
        bodyType: 'Coupe',
        fuelType: 'Petrol',
        transmission: 'Dual-Clutch',
        mileage: 1200,
      });
    expect(res.status).toBe(403);
  });

  it('3. POST /api/v1/vehicles should succeed for dealer role (201)', async () => {
    const res = await request(app)
      .post('/api/v1/vehicles')
      .set('Authorization', `Bearer ${dealerToken}`)
      .send({
        make: 'Porsche',
        model: '911 GT3 RS',
        variant: 'Weissach Package',
        year: 2024,
        bodyType: 'Coupe',
        fuelType: 'Petrol',
        transmission: 'Dual-Clutch',
        mileage: 1200,
        horsepower: 518,
        condition: 'Certified Pre-Owned',
        features: ['PCCB Brakes', 'Front Lift'],
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.make).toBe('Porsche');
    testVehicleId = res.body.data._id;
  });

  // Test 2: Vehicle Retrieval & Search/Filtering
  it('4. GET /api/v1/vehicles with make & bodyType filters', async () => {
    const res = await request(app)
      .get('/api/v1/vehicles')
      .query({ make: 'Porsche', bodyType: 'Coupe' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.pagination.total).toBe(1);
  });

  it('5. GET /api/v1/vehicles/:id should return single vehicle', async () => {
    const res = await request(app).get(`/api/v1/vehicles/${testVehicleId}`);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(testVehicleId);
  });

  it('6. PATCH /api/v1/vehicles/:id should update mileage (200)', async () => {
    const res = await request(app)
      .patch(`/api/v1/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${dealerToken}`)
      .send({ mileage: 1500 });

    expect(res.status).toBe(200);
    expect(res.body.data.mileage).toBe(1500);
  });

  // Test 3: Listing Creation & Ownership
  let testListingId: string;

  it('7. POST /api/v1/listings should create a listing (201)', async () => {
    const res = await request(app)
      .post('/api/v1/listings')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({
        vehicleId: testVehicleId,
        title: '2024 Porsche 911 GT3 RS Allocation',
        description: 'Mint condition track monster with factory warranty.',
        price: 345000,
        location: 'Beverly Hills, CA',
        city: 'Beverly Hills',
        province: 'CA',
        status: 'active',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toContain('2024-porsche-911-gt3-rs');
    expect(res.body.data.status).toBe('active');
    testListingId = res.body.data._id;
  });

  it('8. GET /api/v1/listings should return active listings with populated vehicle', async () => {
    const res = await request(app).get('/api/v1/listings');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].vehicleId.make).toBe('Porsche');
  });

  it('9. GET /api/v1/listings/:id should return single listing', async () => {
    const res = await request(app).get(`/api/v1/listings/${testListingId}`);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(testListingId);
  });

  // Test 4: Ownership Enforcement
  it('10. PATCH /api/v1/listings/:id should fail if non-owner attempts to edit (403)', async () => {
    const res = await request(app)
      .patch(`/api/v1/listings/${testListingId}`)
      .set('Authorization', `Bearer ${dealerToken}`) // dealer does not own this listing
      .send({ price: 300000 });

    expect(res.status).toBe(403);
    expect(res.body.error.message).toContain('Unauthorized');
  });

  it('11. PATCH /api/v1/listings/:id should succeed for original owner (200)', async () => {
    const res = await request(app)
      .patch(`/api/v1/listings/${testListingId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ price: 339000 });

    expect(res.status).toBe(200);
    expect(res.body.data.price).toBe(339000);
  });

  it('12. PATCH /api/v1/listings/:id/status should update listing status (200)', async () => {
    const res = await request(app)
      .patch(`/api/v1/listings/${testListingId}/status`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ status: 'sold' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('sold');
  });

  it('13. Public GET /api/v1/listings should NOT return sold or draft listings', async () => {
    const res = await request(app).get('/api/v1/listings');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0); // sold is not active
  });

  it('14. GET /api/v1/users/me/listings returns user personal listings', async () => {
    const res = await request(app)
      .get('/api/v1/users/me/listings')
      .set('Authorization', `Bearer ${buyerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].status).toBe('sold');
  });

  // Test 5: Image Media S3 Upload URL
  it('15. POST /api/v1/media/upload-url generates presigned key', async () => {
    const res = await request(app)
      .post('/api/v1/media/upload-url')
      .set('Authorization', `Bearer ${dealerToken}`)
      .send({
        fileName: 'gt3_front.jpg',
        fileType: 'image/jpeg',
        fileSize: 4500000,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.uploadUrl).toBeDefined();
    expect(res.body.data.publicUrl).toContain('vehicles/');
  });

  it('16. POST /api/v1/media/upload-url rejects oversized files >15MB (400)', async () => {
    const res = await request(app)
      .post('/api/v1/media/upload-url')
      .set('Authorization', `Bearer ${dealerToken}`)
      .send({
        fileName: 'huge.png',
        fileType: 'image/png',
        fileSize: 20 * 1024 * 1024,
      });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain('exceeds maximum limit');
  });

  // Test 6: Invalid ObjectId
  it('17. Invalid ObjectId returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/v1/vehicles/invalid-hex-id-999');
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain('Invalid ObjectId');
  });

  // Test 7: Admin Delete
  it('18. DELETE /api/v1/vehicles/:id succeeds for admin (200)', async () => {
    const res = await request(app)
      .delete(`/api/v1/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

