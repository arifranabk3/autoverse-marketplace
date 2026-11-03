import { Request, Response } from 'express';
import mongoose from 'mongoose';

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'autoverse-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
}

export function getDatabaseHealth(_req: Request, res: Response): void {
  const state = mongoose.connection.readyState;
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const isConnected = state === 1;

  // Security: Hostname is abstracted to prevent internal infrastructure disclosure
  res.status(isConnected ? 200 : 503).json({
    success: isConnected,
    data: {
      database: 'autoverse',
      status: states[state] || 'unknown',
      connected: isConnected,
      cluster: 'Sellzy-Staging',
      timestamp: new Date().toISOString(),
    },
  });
}
