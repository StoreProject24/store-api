import { BrandsPublic } from '@shared/types/brand.types';
import { getBrands } from '../repository/brand.repository';
import { BrandRepository } from './brand.interface';
import { getSignedImageUrls } from '~services/image/image.service';

export class BrandDomain implements BrandRepository {
  async getBrands(storeId: number) {
    const brands = await getBrands(storeId);
    const brandsWithImage: BrandsPublic[] = []
    for (const brand of brands) {
      const url = await getSignedImageUrls([brand.urlImage])
      brandsWithImage.push({
        ...brand,
        urlImage: url[0]
      })
    }
    return brandsWithImage;
  }
}
