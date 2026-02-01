import { Request } from 'express';
import { isEqual } from 'lodash';
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
  disableMissingCombinations,
  getImagesProductId,
  getProductById,
  getProductByIdAndCombinationId,
  getProductByIdProduct,
  getProducts,
  getProductsByCategoryId,
  update,
  updateStatusProduct,
  upsertVariantCombinations,
  upsertVariantTypes,
  validateExistSku,
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
import { HttpCode } from '@shared/helpers/response/response.type';

export class ProductsDomain implements ProductsRepository {
  // @ts-ignore
  async createProduct(product: ProductCreate) {
    if (product.sku){
      const exist = await validateExistSku(product.storeId, product.sku)
      if (exist){
        throw new AppError(HttpCode.CONFLICT, 'Ya existe un producto con ese sku')
      }
    }
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

  async updateProduct(id: number, storeId: number, newProduct: ProductCreate) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    await update(id, storeId, newProduct);
    const currentProduct = await getProductById(storeId, id)
    if (isEqual(currentProduct.variantCombinations, newProduct.variantCombinations) && isEqual(currentProduct.variantTypes, newProduct.variantTypes)) {
      return currentProduct
    }
    // @ts-ignore
    const variantTypes = await upsertVariantTypes(id, newProduct.variantTypes, currentProduct);
    const optionMap = new Map<string, number>();
    variantTypes.forEach(type => {
      type.options.forEach(option => {
        optionMap.set(`${type.name}:${option.name}`, option.id);
      });
    });
    const combinations = await upsertVariantCombinations(
      id,
      newProduct.variantCombinations,
      // @ts-ignore
      optionMap
    );
    const activeIds = combinations.map(c => c.id);
    await disableMissingCombinations(id, activeIds);
    return {
      id,
      variantTypes,
      variantCombinations: combinations,
    }
  }


  async getProductsByStore(body: ProductsGet) {
    const { products, total } = await getProducts(body);

    return { products, total };
  }

  async getProductById(storeId: number, id: number) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    return await getProductById(storeId, id);
  }

  async getProductByIdAndCombinationId(storeId: number, productId: number, combinationId: number) {
    return await getProductByIdAndCombinationId(storeId, productId, combinationId)
  }

  async getProductsByCategoryId(body: ProductsGetByCategoryId) {
    return await getProductsByCategoryId(body);
  }



  async changeStatusProduct(id: number, storeId: number, status: number) {
    const isMyProduct = await validateIsMyProduct(id, storeId);
    if (!isMyProduct) {
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    return await updateStatusProduct(id, status);
  }

  async uploadImages(productId: number, storeId: number, userId: number, req: Request) {
    // const store = await existStoreRedis(userId, storeId);
    // console.log("store ", store)
    // if (!store) {
    //   throw new AppError(409, 'Store not found');
    // }
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    if (!isMyProduct) {
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    // const existProduct = await getProductByIdProduct(productId);
    // if (!existProduct) {
    //   throw new AppError(404, 'Product not found');
    // }
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
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    await deleteImagesByProductId(productId);
    await deleteProduct(productId, storeId);
  }

  async deleteImages(imagesId: number[], productId: number, storeId: number) {
    const isMyProduct = await validateIsMyProduct(productId, storeId);
    if (!isMyProduct) {
      throw new AppError(HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
    }
    const images = await getImagesProductId(productId);
    if (!images) {
      throw new AppError(HttpCode.NOT_FOUND, 'Images not found');
    }
    await deleteImagesProduct(imagesId);
    await deleteImages(images.map((img) => img.urlImage));
  }
}
