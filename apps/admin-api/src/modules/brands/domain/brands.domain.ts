import { AppError } from '@shared/helpers/response/response';
import {
  create,
  deleteBrand,
  findBrandById,
  getBrands,
  updateImage,
  updateName,
} from '../repository/brands.repository';
import { CreateBrand, GetBrands, UpdateBrandImage, UpdateBrand } from '@shared/types/brand.types';
import { BrandRepository } from './brands.interface';
import { deleteImages, uploadImages } from '~services/image/image.service';
import { Request } from 'express';
import { HttpCode } from '@shared/helpers/response/response.type';

export class BrandsDomain implements BrandRepository {
  async createBrand(body: CreateBrand) {
    return await create(body);
  }
  async updateNameBrand(data: UpdateBrand) {
    const currentBrand = await findBrandById({
      id: data.id,
      storeId: data.storeId,
    });
    if (!currentBrand) {
      throw new AppError(HttpCode.NOT_FOUND, 'Marca no encontrada');
    }
    return await updateName(data);
  }
  async updateImageBrand(data: UpdateBrandImage) {
    const currentBrand = await findBrandById(data);
    if (!currentBrand) {
      throw new AppError(HttpCode.NOT_FOUND, 'Marca no encontrada');
    }
    await deleteImages([currentBrand.urlImage]);
    return await updateImage(data);
  }

  async deleteBrand(id: number, storeId: number) {
    const currentBrand = await findBrandById({
      id,
      storeId,
    });
    if (!currentBrand) {
      throw new AppError(HttpCode.NOT_FOUND, 'Marca no encontrada');
    }
    if (currentBrand?.urlImage) {
      await deleteImages([currentBrand.urlImage]);
    }
    return await deleteBrand(id, storeId);
  }

  async getBrands(data: GetBrands) {
    return await getBrands(data);
  }
  async uploadImageBrand(storeId: number, req: Request) {
    const images = await uploadImages(req, storeId, 'brands');
    return images;
  }
}
