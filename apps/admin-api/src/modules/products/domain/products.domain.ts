import { Request } from 'express';
import { deleteImages, uploadImages } from '~services/image/image.service';
import { AppError } from '@shared/helpers/response/response';
import { existStoreRedis } from '~modules/stores/utils/storeRedis';
import {
  create,
  createProductImages,
  createVariantCombinations,
  createVariantTypes,
  deleteImagesByProductId,
  deleteImagesProduct,
  deleteProduct,
  getImagesProductId,
  getProductById,
  getProductByIdProduct,
  getProducts,
  getProductsByCategoryId,
  update,
  updateStatusProduct,
  validateIsMyProduct,
} from '../repository/products.repository';
import {
  ProductCreate,
  ProductsGet,
  ProductsGetByCategoryId,
  ProductImages,
  Product,
} from '@shared/types/product.types';
import { ProductsRepository } from './products.interface';

export class ProductsDomain implements ProductsRepository {
  // @ts-ignore
  async createProduct(product: ProductCreate) {
    const newProduct = await create(product);
    const types = await createVariantTypes(newProduct.id, product.variantTypes);
    const optionMap = new Map<string, number>();
    types.forEach(t =>
      t.options.forEach(o => optionMap.set(o.name, o.id))
    );

    const combinations = await createVariantCombinations(
      newProduct.id,
      product.variantCombinations,
      optionMap
    );
    return {
      ...newProduct,
      variantCombinations: combinations,
      variantTypes: types,
    }
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
    await update(id, storeId, product);
    
  }

  async changeStatusProduct(id: number, storeId: number, status: number) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    return await updateStatusProduct(id, status);
  }

  async uploadImages(productId: number, storeId: number, userId: number, req: Request) {
    console.log("hola")
    // const store = await existStoreRedis(userId, storeId);
    // console.log("store ", store)
    // if (!store) {
    //   throw new AppError(409, 'Store not found');
    // }
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    console.log("isMyProduct ", isMyProduct)
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    // const existProduct = await getProductByIdProduct(productId);
    // if (!existProduct) {
    //   throw new AppError(404, 'Product not found');
    // }
    console.log("store.id ", storeId)
    const images = await uploadImages(req, storeId, 'products');
    const imagesProduct: ProductImages[] = [];
    for (const img of images) {
      imagesProduct.push({
        urlImage: img,
        productId: productId,
      });
    }
    await createProductImages(imagesProduct);
    return images;
  }

  async deleteProductById(productId: number, storeId: number) {
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    if (!isMyProduct) {
      throw new AppError(401, 'No estas autorizado para esta accion');
    }
    await deleteImagesByProductId(productId);
    await deleteProduct(productId, storeId);
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
