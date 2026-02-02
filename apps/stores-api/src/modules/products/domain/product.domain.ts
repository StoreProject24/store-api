
import { AppError } from '@shared/helpers/response/response';
import { getProductByIdAndStore, getProductsByPage, getProductsRandomByStore, getRelatedProducts } from '../repository/product.repository';
import { ProductRepository } from './product.interface';
import { ProductUser } from '~types/product';
import { HttpCode } from '@shared/helpers/response/response.type';
import { omit } from '~utils/fn';
import { getSignedImageUrls } from '~services/image/image.service';

export class ProductDomain implements ProductRepository {
  async getProductById(storeId: number, id: number) {
    const product = await getProductByIdAndStore(storeId, id);
    if (!product) {
      throw new AppError(HttpCode.OK, 'Producto no encontrado');
    }
    const urls = await getSignedImageUrls(product.images.map((item)=> item.urlImage))
    const images = product.images.map((img, index) => ({
      id: img.id,
      urlImage: urls[index]
    }))
    return {
      ...omit(product, ['price']),
      images
    } as unknown as ProductUser
  }

  async getProductsByPage(
    storeId: number,
    page: number,
    limit: number,
    q: string,
    categoryIds: number[],
  ){
    const { products, total } = await getProductsByPage(page, limit, storeId, q, categoryIds)
    const productsWithImages = []
    for (const product of products) {
      const urls = await getSignedImageUrls(product.images.map((item)=> item.urlImage))
      const images = product.images.map((img, index) => ({
        id: img.id,
        urlImage: urls[index]
      }))
      productsWithImages.push({
        ...omit(product, ['price']),
        images
      })
    }
    return {total, products: productsWithImages as unknown as ProductUser[]}
  }

  async getRandomProducts(storeId: number, limit: number) {
    const products = await getProductsRandomByStore(storeId, limit);
    const productsWithImages = []
    for (const product of products) {
      const urls = await getSignedImageUrls(product.images.map((item)=> item.urlImage))
      const images = product.images.map((img, index) => ({
        id: img.id,
        urlImage: urls[index]
      }))
      productsWithImages.push({
        ...omit(product, ['price']),
        images
      })
    }
    return productsWithImages
  }

  async getRelatedProducts(storeId: number, productId: number, categoryId: number, limit: number) {
    const products = await getRelatedProducts(storeId, productId, categoryId, limit);
    const productsWithImages = []
    for (const product of products) {
      const urls = await getSignedImageUrls(product.images.map((item)=> item.urlImage))
      const images = product.images.map((img, index) => ({
        id: img.id,
        urlImage: urls[index]
      }))
      productsWithImages.push({
        ...omit(product, ['price']),
        images
      })
    }
    return productsWithImages
  }
}
