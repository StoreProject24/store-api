import { AppError } from '@shared/helpers/response/response';
import { getProductByIdAndStore, getProductsByPage } from '../repository/product.repository';
import { ProductRepository } from './product.interface';
import { Product } from '@shared/types/product.types';

export class ProductDomain implements ProductRepository {
  async getProductById(storeId: number, id: number): Promise<Product | null> {
    const product = await getProductByIdAndStore(storeId, id);
    if (!product) {
      throw new AppError(404, 'Product no found');
    }
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.pricePublic,
      quantity: product.quantity,
      categoryId: product.categoryId,
      sku: product.sku,
      pricePublic: product.pricePublic,
      images: [
        product.images?.map((img) => ({
          id: img.id,
          productId: img.productId,
          urlImage: img.urlImage,
        })) || [],
      ],
      tags: product.tags || [],
      variants: product.variants || [],
      storeId: product.storeId,
      video: product.video || '',
      brandId: product.brandId,
      statusId: product.statusId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getProductsByPage(
    storeId: number,
    page: number,
    limit: number
  ): Promise<{ total: number; products: Product[] }> {
    const { products, total } = await getProductsByPage(page, limit, storeId);
    return {
      total,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.pricePublic,
        quantity: product.quantity,
        categoryId: product.categoryId,
        sku: product.sku,
        pricePublic: product.pricePublic,
        images: [
          product.images?.map((img) => ({
            id: img.id,
            productId: img.productId,
            urlImage: img.urlImage,
          })) || [],
        ],
        tags: product.tags || [],
        variants: product.variants || [],
        storeId: product.storeId,
        video: product.video || '',
        brandId: product.brandId,
        statusId: product.statusId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    };
  }
}
