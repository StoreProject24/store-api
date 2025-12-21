export interface Brand {
  id: number;
  name: string;
  urlImage: string;
  storeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBrand = Omit<Brand, 'id'>;

export type UpdateBrand = Omit<Brand, 'createdAt' | 'updatedAt'>;

export interface GetBrands {
  storeId: number;
  statusIds: number[];
}

export interface UpdateBrandImage {
  id: number;
  urlImage: string;
  storeId: number;
}

export type BrandsPublic = Omit<Brand, 'statusId' | 'storeId' | 'createdAt' | 'updatedAt'>;