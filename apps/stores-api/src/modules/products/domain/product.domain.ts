import { AppError } from '@shared/helpers/response/response';
import { getProductByIdAndStore, getProductsByPage, getRandomProducts, getRelatedProducts } from '../repository/product.repository';
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
      images: product.images?.map((img) => ({
          id: img.id,
          productId: img.productId,
          urlImage: img.urlImage,
        })) || [],
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
    limit: number,
    search: string,
    categoryIds: string | null
  ): Promise<{ total: number; products: Product[] }> {
    const { products, total } = await getProductsByPage(page, limit, storeId, search, categoryIds);
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
        images: product.images?.map((img) => ({
          id: img.id,
          productId: img.productId,
          urlImage: img.urlImage,
        })) || [],
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

  async getRandomProduct(storeId: number, limit: number): Promise<Product[]> {
    const products = await getRandomProducts(storeId, limit);
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.pricePublic,
      quantity: product.quantity,
      categoryId: product.categoryId,
      sku: product.sku,
      pricePublic: product.pricePublic,
      images:  product.images?.map((img) => ({
          id: img.id,
          productId: img.productId,
          urlImage: img.urlImage,
        })) || [],
      tags: product.tags || [],
      variants: product.variants || [],
      storeId: product.storeId,
      video: product.video || '',
      brandId: product.brandId,
      statusId: product.statusId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  async getRelatedProduct(storeId: number, productId: number, categoryId: number, limit: number): Promise<Product[]> {
    const products = await getRelatedProducts(storeId, productId, categoryId, limit);
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.pricePublic,
      quantity: product.quantity,
      categoryId: product.categoryId,
      sku: product.sku,
      pricePublic: product.pricePublic,
      images: product.images?.map((img) => ({
          id: img.id,
          productId: img.productId,
          urlImage: img.urlImage,
        })) || [],
      tags: product.tags || [],
      variants: product.variants || [],
      storeId: product.storeId,
      video: product.video || '',
      brandId: product.brandId,
      statusId: product.statusId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }
}
