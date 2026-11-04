import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/User';
import { Dealer } from '../models/Dealer';
import { Vehicle } from '../models/Vehicle';
import { Listing } from '../models/Listing';
import { Brand } from '../models/Brand';
import { Inquiry } from '../models/Inquiry';
import { SavedSearch } from '../models/SavedSearch';
import { MOCK_VEHICLES, MOCK_DEALERS, MOCK_BRANDS } from '../data/seedData';

async function seed() {
  console.log('[Seed] Starting database population...');
  await connectDatabase();

  const userCount = await User.countDocuments();
  if (userCount > 0) {
    console.log(`[Seed] Database already contains ${userCount} users. Ensuring core accounts exist.`);
  }

  // 1. Create Core Users
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('autoverse2026', salt);

  const buyer = await User.findOneAndUpdate(
    { email: 'buyer@autoverse.com' },
    {
      name: 'Alexander Pierce',
      email: 'buyer@autoverse.com',
      passwordHash,
      role: 'buyer',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      status: 'active',
    },
    { upsert: true, new: true }
  );

  const dealerUser = await User.findOneAndUpdate(
    { email: 'dealer@autoverse.com' },
    {
      name: 'Marcus Vance',
      email: 'dealer@autoverse.com',
      passwordHash,
      role: 'dealer',
      phone: '+1 (310) 555-0199',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: 'active',
    },
    { upsert: true, new: true }
  );

  const adminUser = await User.findOneAndUpdate(
    { email: 'admin@autoverse.com' },
    {
      name: 'Elena Rostova',
      email: 'admin@autoverse.com',
      passwordHash,
      role: 'admin',
      phone: '+1 (800) 555-AUTO',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      status: 'active',
    },
    { upsert: true, new: true }
  );

  console.log('[Seed] Core user credentials ready (buyer, dealer, admin with password: autoverse2026).');

  // 2. Seed Brands
  for (const b of MOCK_BRANDS) {
    await Brand.findOneAndUpdate(
      { slug: b.slug },
      {
        name: b.name,
        slug: b.slug,
        country: b.country || 'International',
        founded: b.founded || 1931,
        description: b.description || b.desc || 'High performance automotive marque.',
        logo: b.logo,
        heroImage: b.heroImage || b.hero || b.logo,
        vehicleCount: b.vehicleCount || b.count || 12,
        popularModels: b.popularModels || [],
      },
      { upsert: true }
    );
  }
  console.log(`[Seed] Seeded ${MOCK_BRANDS.length} Brands.`);

  // 3. Seed Dealers
  const dealerMap: Record<string, any> = {};
  for (const d of MOCK_DEALERS) {
    const dealerDoc = await Dealer.findOneAndUpdate(
      { slug: d.id },
      {
        userId: dealerUser._id,
        businessName: d.name,
        slug: d.id,
        description: d.description,
        contactDetails: {
          phone: d.phone,
          email: d.email,
          website: d.website,
        },
        location: {
          address: d.address,
          city: d.address.split(',')[1]?.trim() || 'Beverly Hills',
          state: 'CA',
          country: 'USA',
        },
        verificationStatus: d.verified ? 'verified' : 'pending',
        rating: d.rating,
        reviewsCount: d.reviewsCount,
        logo: d.logo,
        bannerImage: d.bannerImage,
      },
      { upsert: true, new: true }
    );
    dealerMap[d.id] = dealerDoc._id;
  }
  console.log(`[Seed] Seeded ${MOCK_DEALERS.length} Dealerships.`);

  // 4. Seed Vehicles and Listings
  for (const v of MOCK_VEHICLES) {
    const vehicleDoc = await Vehicle.findOneAndUpdate(
      { vin: `VIN-${v.id}` },
      {
        make: v.make,
        model: v.model,
        variant: v.variant || '',
        year: v.year,
        bodyType: v.bodyType as any,
        fuelType: v.fuelType as any,
        transmission: v.transmission as any,
        mileage: v.mileage,
        condition: (v.condition as any) || 'Brand New',
        exteriorColor: v.exteriorColor || 'Metallic Black',
        interiorColor: v.interiorColor || 'Black Leather',
        horsepower: v.horsepower || 600,
        acceleration: v.acceleration || '3.2s',
        topSpeed: v.topSpeed || '205 mph',
        vin: `VIN-${v.id}`,
        specifications: {
          engine: v.engine || 'V8 Twin-Turbo',
          drivetrain: v.drivetrain || 'All-Wheel Drive',
        },
        features: v.features || ['Premium Audio', 'Carbon Ceramic Brakes', 'Navigation System'],
        images: v.images && v.images.length ? v.images : [v.image],
      },
      { upsert: true, new: true }
    );

    const dId = dealerMap[v.dealer.id] || dealerMap['dlr_apex'];

    await Listing.findOneAndUpdate(
      { slug: v.id },
      {
        vehicleId: vehicleDoc._id,
        sellerId: dealerUser._id,
        dealerId: dId,
        title: v.title,
        slug: v.id,
        description: v.description,
        price: v.price,
        currency: 'USD',
        location: v.location,
        city: v.location.split(',')[0]?.trim() || 'Los Angeles',
        province: v.location.split(',')[1]?.trim() || 'CA',
        images: v.images && v.images.length ? v.images : [v.image],
        status: 'active',
        featured: Boolean(v.featured),
        publishedAt: new Date(),
      },
      { upsert: true }
    );
  }
  console.log(`[Seed] Seeded ${MOCK_VEHICLES.length} Vehicles and Listings.`);

  // 5. Seed Demo Inquiries for Dealer & Buyer
  await Inquiry.findOneAndUpdate(
    { email: 'buyer@autoverse.com', vehicleName: '2024 Porsche 911 GT3 RS' },
    {
      buyerId: buyer._id,
      dealerId: dealerMap['dlr_apex'],
      vehicleName: '2024 Porsche 911 GT3 RS',
      name: 'Alexander Pierce',
      email: 'buyer@autoverse.com',
      phone: '+1 (555) 234-5678',
      message: 'Interested in track pack options and international delivery to New York.',
      financingInterest: true,
      tradeInInterest: false,
      status: 'pending',
    },
    { upsert: true }
  );

  console.log('[Seed] Database initialization complete!');
  await disconnectDatabase();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed Error]:', err);
  process.exit(1);
});
