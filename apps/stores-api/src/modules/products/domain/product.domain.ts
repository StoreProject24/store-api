
import { AppError } from '@shared/helpers/response/response';
import { getProductByIdAndStore, getProductsByPage, getProductsRandomByStore, getRelatedProducts } from '../repository/product.repository';
import { ProductRepository } from './product.interface';
import { ProductUser } from '~types/product';
import { HttpCode } from '@shared/helpers/response/response.type';
import { omit } from '~utils/fn';

export class ProductDomain implements ProductRepository {
  async getProductById(storeId: number, id: number) {
    const product = await getProductByIdAndStore(storeId, id);
    if (!product) {
      throw new AppError(HttpCode.OK, 'Producto no encontrado');
    }
    return omit(product, ['price']) as unknown as ProductUser
  }

  async getProductsByPage(
    storeId: number,
    page: number,
    limit: number,
    q: string,
    categoryIds: number[],
  ){
    const { products, total } = await getProductsByPage(page, limit, storeId, q, categoryIds)
    return {total, products: products.map(product => omit(product, ['price'])) as unknown as ProductUser[]}
  }

  async getRandomProducts(storeId: number, limit: number) {
    const products = await getProductsRandomByStore(storeId, limit);
    return products.map(product => omit(product, ['price'])) as unknown as ProductUser[]
  }

  async getRelatedProducts(storeId: number, productId: number, categoryId: number, limit: number) {
    const products = await getRelatedProducts(storeId, productId, categoryId, limit);
    return products.map(product => omit(product, ['price'])) as unknown as ProductUser[]
  }
}
