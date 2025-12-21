import { getBrands } from '../repository/brand.repository';
import { BrandRepository } from './brand.interface';

export class BrandDomain implements BrandRepository {
  async getBrands(storeId: number) {
    const brands = await getBrands(storeId);
    return brands;
  }
}
