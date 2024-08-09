import { Request } from 'express';
import { deleteImages, uploadImages } from '~services/image/image.service';
import { AppError } from '~config/helpers';
import { existStoreRedis } from '~modules/stores/utils/storeRedis';
import {
  create,
  createProductImages,
  deleteImagesProduct,
  getImagesProductId,
  getProductById,
  getProductByIdProduct,
  getProducts,
  getProductsByCategoryId,
  update,
  updateStatusProduct,
  validateIsMyProduct,
} from '../repository/products.repository';
import { ProductCreate, ProductsGet, ProductsGetByCategoryId, ProductImages } from '../types/products.types';
import { ProductsRepository } from './products.interface';

export class ProductsDomain implements ProductsRepository {
  async createProduct(product: ProductCreate) {
    return await create(product);
  }

  async getProductsByStore(body: ProductsGet) {
    const { products, total } = await getProducts(body);

    return { products, total };
  }

  async getProductById(storeId: number, id: number) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    return await getProductById(storeId, id);
  }

  async getProductsByCategoryId(body: ProductsGetByCategoryId) {
    return await getProductsByCategoryId(body);
  }

  async updateProduct(id: number, storeId: number, product: ProductCreate) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    return await update(id, storeId, product);
  }

  async changeStatusProduct(id: number, storeId: number, status: number) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    return await updateStatusProduct(id, status);
  }

  async uploadImages(productId: number, storeId: number, userId: number, req: Request) {
    const store = await existStoreRedis(userId, storeId);
    if (!store) {
      throw new AppError(409, 'Store not found');
    }
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    const existProduct = await getProductByIdProduct(productId);
    if (!existProduct) {
      throw new AppError(404, 'Product not found');
    }
    const images = await uploadImages(req, store.id, 'products');
    const imagesProduct: ProductImages['images'] = [];
    for (const img of images!) {
      imagesProduct.push({
        urlImage: img,
        productId: productId,
      });
    }
    await createProductImages(imagesProduct);
    return images;
  }

  async deleteImages(imagesId: number[], productId: number, storeId: number) {
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    const images = await getImagesProductId(productId);
    if (!images) {
      throw new AppError(404, 'Images not found');
    }
    await deleteImagesProduct(imagesId);
    await deleteImages(images.map((img) => img.urlImage));
  }
}
