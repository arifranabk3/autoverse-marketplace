import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { Vehicle } from '../src/models/Vehicle';
import { Dealer } from '../src/models/Dealer';
import { User } from '../src/models/User';
import { Listing } from '../src/models/Listing';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'autoverse',
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: 'autoverse' });
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('AUTOVERSE API & Database Integration Tests', () => {
  it('GET /api/v1/health should return service health', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
  });

  it('GET /api/v1/health/database should report connected to autoverse database', async () => {
    const res = await request(app).get('/api/v1/health/database');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.connected).toBe(true);
    expect(res.body.data.database).toBe('autoverse');
  });

  it('Vehicle Model CRUD & GET /api/v1/vehicles', async () => {
    const newVehicle = await Vehicle.create({
      make: 'Porsche',
      model: '911 GT3 RS',
      year: 2024,
      price: 345000,
      mileage: 1200,
      fuelType: 'Petrol',
      transmission: 'Dual-Clutch',
      bodyType: 'Coupe',
      condition: 'Certified Pre-Owned',
      horsepower: 518,
      specifications: { engine: '4.0L Naturally Aspirated Boxer-6' },
      images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e'],
    });

    expect(newVehicle._id).toBeDefined();
    expect(newVehicle.make).toBe('Porsche');

    const res = await request(app).get('/api/v1/vehicles');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].model).toBe('911 GT3 RS');

    // Test GET /api/v1/vehicles/:id
    const idRes = await request(app).get(`/api/v1/vehicles/${newVehicle._id}`);
    expect(idRes.status).toBe(200);
    expect(idRes.body.data.make).toBe('Porsche');
  });

  it('Should handle invalid ObjectId properly (400 Bad Request)', async () => {
    const res = await request(app).get('/api/v1/vehicles/invalid-object-id-123');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('INVALID_ID');
  });

  it('Should return 404 for non-existent vehicle ObjectId', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/v1/vehicles/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('Dealers and Listings Model Verification', async () => {
    const user = await User.create({
      name: 'Showroom Owner',
      email: 'dealer@apexmotors.com',
      passwordHash: 'hashed_password_123',
      role: 'dealer',
    });

    const dealer = await Dealer.create({
      userId: user._id,
      businessName: 'Apex Prestige Motors',
      slug: 'apex-prestige-motors',
      description: 'Curated exotic showroom',
      contactDetails: {
        phone: '+1 (310) 555-0199',
        email: 'vip@apexmotors.com',
      },
      location: {
        address: '9405 Wilshire Blvd',
        city: 'Beverly Hills',
        state: 'CA',
        country: 'USA',
      },
      verificationStatus: 'verified',
    });

    expect(dealer.businessName).toBe('Apex Prestige Motors');

    const dealerRes = await request(app).get('/api/v1/dealers');
    expect(dealerRes.status).toBe(200);
    expect(dealerRes.body.data.length).toBeGreaterThan(0);
  });
});
