import { Brand } from '@shared/types/brand.types';

export interface BrandRepository {
  getBrands: (storeId: number) => Promise<Brand[]>;
}
