import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import mongoose from 'mongoose';

export interface AuthUser {
  userId: string;
  email: string;
  role: 'buyer' | 'dealer' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Missing or malformed Bearer token.', 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'autoverse_enterprise_jwt_super_secret_key_2026';

    const decoded = jwt.verify(token, secret) as AuthUser;
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error instanceof AppError) return next(error);
    next(new AppError('Invalid or expired authentication token.', 401));
  }
}

export function authorizeRoles(...allowedRoles: Array<'buyer' | 'dealer' | 'admin'>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(`Access forbidden. Role '${req.user.role}' is not authorized for this resource.`, 403)
      );
    }

    next();
  };
}

export function validateObjectIdParam(paramName: string = 'id') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(`Invalid ObjectId parameter format: ${id}`, 400));
    }
    next();
  };
}

