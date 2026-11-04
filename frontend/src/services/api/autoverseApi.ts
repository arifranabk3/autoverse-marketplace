import axios, { AxiosInstance } from 'axios';
import { ApiResponse, ApiHealthResponse, ApiDatabaseHealthResponse } from '@/types/api';
import { Vehicle, Dealer, Brand } from '@/types';

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
        const token = localStorage.getItem('auth_token') || localStorage.getItem('autoverse_auth_token_v2');
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

  // Authentication
  async register(payload: any): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/auth/register', payload);
    return res.data.data;
  }

  async login(payload: { email: string; password: string }): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/auth/login', payload);
    return res.data.data;
  }

  async getMe(): Promise<any> {
    const res = await this.client.get<ApiResponse<any>>('/auth/me');
    return res.data.data;
  }

  async updateProfile(payload: any): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>('/auth/profile', payload);
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

  async createVehicle(payload: any): Promise<Vehicle> {
    const res = await this.client.post<ApiResponse<Vehicle>>('/vehicles', payload);
    return res.data.data;
  }

  async updateVehicle(id: string, payload: any): Promise<Vehicle> {
    const res = await this.client.patch<ApiResponse<Vehicle>>(`/vehicles/${id}`, payload);
    return res.data.data;
  }

  async deleteVehicle(id: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/vehicles/${id}`);
    return res.data;
  }

  // Listings
  async getListings(params?: Record<string, any>): Promise<ApiResponse<any[]>> {
    const res = await this.client.get<ApiResponse<any[]>>('/listings', { params });
    return res.data;
  }

  async getListingById(id: string): Promise<any> {
    const res = await this.client.get<ApiResponse<any>>(`/listings/${id}`);
    return res.data.data;
  }

  async createListing(payload: any): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/listings', payload);
    return res.data.data;
  }

  async updateListing(id: string, payload: any): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/listings/${id}`, payload);
    return res.data.data;
  }

  async updateListingStatus(id: string, status: string): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/listings/${id}/status`, { status });
    return res.data.data;
  }

  async deleteListing(id: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/listings/${id}`);
    return res.data;
  }

  async getMyListings(): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/users/me/listings');
    return res.data.data;
  }

  // Buyer Operations
  async getFavorites(): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/buyer/favorites');
    return res.data.data;
  }

  async addFavorite(listingId: string): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/buyer/favorites', { listingId });
    return res.data.data;
  }

  async removeFavorite(listingId: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/buyer/favorites/${listingId}`);
    return res.data;
  }

  async getComparisons(): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/buyer/comparisons');
    return res.data.data;
  }

  async addComparison(listingId: string): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/buyer/comparisons', { listingId });
    return res.data.data;
  }

  async removeComparison(listingId: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/buyer/comparisons/${listingId}`);
    return res.data;
  }

  async getSavedSearches(): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/buyer/saved-searches');
    return res.data.data;
  }

  async createSavedSearch(payload: any): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/buyer/saved-searches', payload);
    return res.data.data;
  }

  async deleteSavedSearch(id: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/buyer/saved-searches/${id}`);
    return res.data;
  }

  async createInquiry(payload: any): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/inquiries', payload);
    return res.data;
  }

  async getBuyerInquiries(): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/buyer/inquiries');
    return res.data.data;
  }

  // Dealer Operations
  async getDealers(params?: Record<string, any>): Promise<ApiResponse<Dealer[]>> {
    const res = await this.client.get<ApiResponse<Dealer[]>>('/dealers', { params });
    return res.data;
  }

  async getDealerById(id: string): Promise<any> {
    const res = await this.client.get<ApiResponse<any>>(`/dealers/${id}`);
    return res.data.data;
  }

  async getDealerDashboard(): Promise<any> {
    const res = await this.client.get<ApiResponse<any>>('/dealer/dashboard');
    return res.data.data;
  }

  async getDealerLeads(params?: Record<string, any>): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/dealer/leads', { params });
    return res.data.data;
  }

  async updateLeadStatus(id: string, payload: { status?: string; dealerNotes?: string }): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/dealer/leads/${id}`, payload);
    return res.data.data;
  }

  async updateDealerProfile(payload: any): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>('/dealer/profile', payload);
    return res.data.data;
  }

  // Admin Operations
  async getAdminDashboard(): Promise<any> {
    const res = await this.client.get<ApiResponse<any>>('/admin/dashboard');
    return res.data.data;
  }

  async getAdminUsers(params?: Record<string, any>): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/admin/users', { params });
    return res.data.data;
  }

  async updateAdminUserStatus(id: string, payload: { status?: string; role?: string }): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/admin/users/${id}/status`, payload);
    return res.data.data;
  }

  async updateDealerVerification(id: string, verificationStatus: string): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/admin/dealers/${id}/verification`, { verificationStatus });
    return res.data.data;
  }

  async moderateListing(id: string, payload: { status: string; reason?: string }): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/admin/listings/${id}/moderate`, payload);
    return res.data.data;
  }

  async getAdminReports(params?: Record<string, any>): Promise<any[]> {
    const res = await this.client.get<ApiResponse<any[]>>('/admin/reports', { params });
    return res.data.data;
  }

  async resolveReport(id: string, payload: { status: string; adminNotes?: string }): Promise<any> {
    const res = await this.client.patch<ApiResponse<any>>(`/admin/reports/${id}/resolve`, payload);
    return res.data.data;
  }

  // Brands
  async getBrands(): Promise<Brand[]> {
    const res = await this.client.get<ApiResponse<Brand[]>>('/brands');
    return res.data.data;
  }

  async createBrand(payload: any): Promise<Brand> {
    const res = await this.client.post<ApiResponse<Brand>>('/brands', payload);
    return res.data.data;
  }

  async updateBrand(id: string, payload: any): Promise<Brand> {
    const res = await this.client.patch<ApiResponse<Brand>>(`/brands/${id}`, payload);
    return res.data.data;
  }

  async deleteBrand(id: string): Promise<any> {
    const res = await this.client.delete<ApiResponse<any>>(`/brands/${id}`);
    return res.data;
  }

  // Media / Presigned S3 Upload URL
  async getUploadUrl(payload: { fileName: string; fileType: string; fileSize: number }): Promise<any> {
    const res = await this.client.post<ApiResponse<any>>('/media/upload-url', payload);
    return res.data.data;
  }
}

export const autoverseApi = new AutoverseApiClient();
