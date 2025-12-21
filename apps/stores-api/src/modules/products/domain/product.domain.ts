import { AppError } from '@shared/helpers/response/response';
import { getProductByIdAndStore, getProductsByPage, getProductsRandomByStore, getRelatedProducts } from '../repository/product.repository';
import { ProductRepository } from './product.interface';
import { Product, ProductUser } from '@shared/types/product.types';

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
      variantCombinations: [],
      variantTypes: [],
      // images: [
      //   product.images?.map((img) => ({
      //     id: img.id,
      //     productId: img.productId,
      //     urlImage: img.urlImage,
      //   })) || [],
      // ],
      images: [],
      tags: product.tags || [],
      // variants: product.variants || [],
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
    q: string,
    categoryIds: number[],
  ): Promise<{ total: number; products: Product[] }> {
    const { products, total } = await getProductsByPage(page, limit, storeId, q, categoryIds);
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
        images: [],
        variantCombinations: [],
        variantTypes: [],
        // images: [
        //   product.images?.map((img) => ({
        //     id: img.id,
        //     productId: img.productId,
        //     urlImage: img.urlImage,
        //   })) || [],
        // ],
        tags: product.tags || [],
        // variants: product.variants || [],
        storeId: product.storeId,
        video: product.video || '',
        brandId: product.brandId,
        statusId: product.statusId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    };
  }

  async getRandomProducts(storeId: number, limit: number): Promise<ProductUser[]> {
    const products = await getProductsRandomByStore(storeId, limit);
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.pricePublic,
      quantity: product.quantity,
      categoryId: product.categoryId,
      sku: product.sku,
      brandId: product.brandId,
      storeId: product.storeId,
      video: product.video || '',
      tags: product.tags || [],
      variantCombinations: [],
      variantTypes: [],
      pricePublic: product.pricePublic,
      statusId: product.statusId,
    }));
  }

  async getRelatedProducts(storeId: number, productId: number, categoryId: number, limit: number): Promise<ProductUser[]> {
    const products = await getRelatedProducts(storeId, productId, categoryId, limit);
    // @ts-ignore
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.pricePublic,
      brandId: product.brandId,
      categoryId: product.categoryId,
      pricePublic: product.pricePublic,
      quantity: product.quantity,
      sku: product.sku,
      statusId: product.statusId,
      tags: product.tags,
    }));
  }
}
