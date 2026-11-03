import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiHealthResponse, ApiDatabaseHealthResponse } from '@/types/api';
import { Vehicle, Dealer } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export class AutoverseApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorData = error.response?.data?.error || {
          code: 'NETWORK_ERROR',
          message: error.message || 'Unable to connect to AUTOVERSE API service',
        };
        return Promise.reject(errorData);
      }
    );
  }

  // System & Health
  async getHealth(): Promise<ApiHealthResponse> {
    const res = await this.client.get<ApiResponse<ApiHealthResponse>>('/health');
    return res.data.data;
  }

  async getDatabaseHealth(): Promise<ApiDatabaseHealthResponse> {
    const res = await this.client.get<ApiResponse<ApiDatabaseHealthResponse>>('/health/database');
    return res.data.data;
  }

  // Vehicles
  async getVehicles(params?: Record<string, any>): Promise<ApiResponse<Vehicle[]>> {
    const res = await this.client.get<ApiResponse<Vehicle[]>>('/vehicles', { params });
    return res.data;
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const res = await this.client.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
    return res.data.data;
  }

  // Dealers
  async getDealers(params?: Record<string, any>): Promise<ApiResponse<Dealer[]>> {
    const res = await this.client.get<ApiResponse<Dealer[]>>('/dealers', { params });
    return res.data;
  }

  // Listings
  async getListings(params?: Record<string, any>): Promise<ApiResponse<any[]>> {
    const res = await this.client.get<ApiResponse<any[]>>('/listings', { params });
    return res.data;
  }
}

export const autoverseApi = new AutoverseApiClient();
