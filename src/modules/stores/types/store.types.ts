export interface Store {
  id: number;
  name: string;
  address: string;
  domain: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  zip: string;
  statusId: number;
  bannerUrl: string;
  logoUrl: string;
  userId: number;
}

export interface StoreCreate {
  name: string;
  address: string;
  domain: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  zip: string;
  bannerUrl: string;
  logoUrl: string;
  userId: number;
}

export interface FieldStore {
  field: 'bannerUrl' | 'logoUrl';
}

export interface StoreUpdate {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  city?: string;
  zip?: string;
  bannerUrl?: string;
  logoUrl?: string;
  userId?: number;
  domain?: string;
  statusId?: number;
}
