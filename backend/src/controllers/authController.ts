import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Dealer } from '../models/Dealer';
import { AppError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'autoverse_enterprise_jwt_super_secret_key_2026';
const JWT_EXPIRES_IN = '7d';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, role, phone, dealershipName } = req.body;

    if (!name || !email || !password) {
      throw new AppError('Name, email, and password are required.', 400, 'VALIDATION_ERROR');
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      throw new AppError('An account with this email already exists.', 409, 'DUPLICATE_KEY');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userRole = role === 'dealer' ? 'dealer' : role === 'admin' ? 'admin' : 'buyer';

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: userRole,
      phone: phone ? phone.trim() : undefined,
      status: 'active',
    });

    let dealerProfile = null;
    if (userRole === 'dealer') {
      const bName = dealershipName || `${name}'s Dealership`;
      const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      dealerProfile = await Dealer.create({
        userId: user._id,
        businessName: bName,
        slug: slug || `dealer-${user._id}`,
        description: 'Authorized luxury & performance automotive dealership.',
        contactDetails: {
          phone: phone || '+1 (555) 000-0000',
          email: email.toLowerCase().trim(),
        },
        location: {
          address: 'Automotive Boulevard',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
        },
        verificationStatus: 'verified',
        rating: 5.0,
        reviewsCount: 1,
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          dealershipName: dealerProfile?.businessName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required.', 400, 'VALIDATION_ERROR');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      throw new AppError('Invalid credentials.', 401, 'INVALID_CREDENTIALS');
    }

    if (user.status === 'suspended') {
      throw new AppError('Account is suspended. Please contact customer support.', 403, 'ACCOUNT_SUSPENDED');
    }

    // Verify password against bcrypt hash or fallback demo matches
    let isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid && user.passwordHash === password) {
      isValid = true;
    }

    if (!isValid) {
      throw new AppError('Invalid credentials.', 401, 'INVALID_CREDENTIALS');
    }

    let dealerProfile = null;
    if (user.role === 'dealer') {
      dealerProfile = await Dealer.findOne({ userId: user._id });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          dealershipName: dealerProfile?.businessName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('Authentication required.', 401, 'UNAUTHORIZED');
    }

    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      throw new AppError('User not found.', 404, 'NOT_FOUND');
    }

    let dealerProfile = null;
    if (user.role === 'dealer') {
      dealerProfile = await Dealer.findOne({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        dealershipName: dealerProfile?.businessName,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('Authentication required.', 401, 'UNAUTHORIZED');
    }

    const { name, phone, avatar } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError('User not found.', 404, 'NOT_FOUND');
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (avatar !== undefined) user.avatar = avatar.trim();

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
}

