import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';

export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
  fileSize: number;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export async function generateUploadUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { fileName, fileType, fileSize } = req.body;

    if (!fileName || !fileType || !fileSize) {
      throw new AppError('fileName, fileType, and fileSize are required.', 400);
    }

    if (!ALLOWED_MIME_TYPES.includes(fileType)) {
      throw new AppError(`Unsupported file format '${fileType}'. Allowed formats: ${ALLOWED_MIME_TYPES.join(', ')}`, 400);
    }

    if (fileSize > MAX_FILE_SIZE_BYTES) {
      throw new AppError(`File exceeds maximum limit of 15MB (${Math.round(fileSize / (1024 * 1024))}MB uploaded)`, 400);
    }

    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageKey = `vehicles/${req.user!.userId}/${Date.now()}-${sanitizedName}`;

    // Cloudflare R2 / AWS S3 S3-compatible architecture:
    // In production, getSignedUrlPromise from @aws-sdk/s3-request-presigner is invoked here
    const s3Bucket = process.env.S3_BUCKET || 'autoverse-vehicle-media-storage';
    const cdnBase = process.env.CDN_BASE_URL || 'https://media.autoverse.com';

    const uploadUrl = `https://${s3Bucket}.s3.amazonaws.com/${storageKey}?signature=mock_presigned_s3_payload`;
    const publicUrl = `${cdnBase}/${storageKey}`;

    res.status(200).json({
      success: true,
      data: {
        uploadUrl,
        publicUrl,
        storageKey,
        expiresIn: 900, // 15 mins
        headers: {
          'Content-Type': fileType,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

