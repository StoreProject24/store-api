import { AppError } from '@shared/helpers/response/response';
import {
  create,
  deleteSale,
  getLastSaleSequential,
  getSaleById,
  getSalesByStore,
  updateStatusSale,
} from '../repository/sale.repository';
import { SaleRepository } from './sale.interface';
import { CreateSaleBody, Sale } from '@shared/types/sale.types';
import { compareSaleWithProducts, getProductsToUpdate } from '@shared/utils/functions/saleWithProducts';
import { convertToObjectId } from '../utils/convetObjetId';
import { ProductsDomain } from '~modules/products/domain/products.domain';
import { getProductsByIds, restoreProductsQuantity, updateProductsQuantity } from '~modules/products/repository/products.repository';
import { HttpCode } from '@shared/helpers/response/response.type';
import { StatsService } from '@shared/services/stats'
import { STATUS } from '@shared/types/status.types';
import { getSignedImageUrls } from '~services/image/image.service';
import { Product } from '@shared/types/product.types';

export class SaleDomain implements SaleRepository {
  async createSale(body: CreateSaleBody) {
    const products = await getProductsByIds(
      body.storeId,
      body.items.map((item) => item.productId)
    );
    if (products.length !== body.items.length) {
      throw new AppError(HttpCode.NOT_FOUND, 'Productos no encontrados');
    }

    // StatsService.recalculateDailyByStore(body.storeId, )
    // compareSaleWithProducts(body, products);
    // const saleSequence = await getLastSaleSequential(body.storeId);
    // let sequential = 0;
    // if (saleSequence) {
    //   sequential = saleSequence.sequential + 1;
    // }
    // const sale = await create({
    //   ...body,
    //   sequential,
    // });
    // const productsToUpdate = getProductsToUpdate(sale.items, products, body.status);
    // await updateProductsQuantity(productsToUpdate);
    // return sale;
    return {} as Sale
  }

  async getSalesByPage(storeId: number, limit: number, page: number, q: string, statuses: number[], dates: { start: string, end: string }) {
    return await getSalesByStore(storeId, page, limit, q, statuses, dates);
  }

  async changeSaleStatus(storeId: number, saleId: string, newStatusId: number) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    console.log("existSale ", existSale)
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    if (existSale.statusId === STATUS.deleted) {
      throw new AppError(HttpCode.BAD_REQUEST, 'La venta no puede ser cancelada porque ya fue eliminada');
    }
    if (existSale.statusId === STATUS.paid) {
      throw new AppError(HttpCode.BAD_REQUEST, 'La venta no puede ser cancelada porque ya fue pagada');
    }
    if (newStatusId === STATUS.cancel) {
      await restoreProductsQuantity(existSale.items.toObject())
    }
    if (existSale.statusId === STATUS.cancel && newStatusId === STATUS.paid || newStatusId === STATUS.pending){
      await updateProductsQuantity(existSale.items.toObject())
    }
    return await updateStatusSale(storeId, convertToObjectId(saleId), newStatusId);
  }

  async deleteSaleByStore(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    await restoreProductsQuantity(existSale?.items.toObject())
    return await deleteSale(storeId, convertToObjectId(saleId));
  }

  async getSaleProducts(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    const products: Product[] = [];
    const productDomain = new ProductsDomain();
    for (const item of existSale.toJSON().items) {
      let product: Product | null;
      if (item.combinationId) {
        // @ts-ignore
        product = await productDomain.getProductByIdAndCombinationId(storeId, item.productId, item.combinationId)
      } else {
        // @ts-ignore
        product = await productDomain.getProductById(storeId, item.productId);
      }
      if (!product) {
        throw new AppError(HttpCode.NOT_FOUND, "Producto no encontrado");
      }
      const urls = await getSignedImageUrls(product.images.map((item) => item.urlImage))
      const images = product.images.map((img, index) => ({
        id: img.id,
        productId: img.productId,
        urlImage: urls[index]
      }))
      products.push({
        ...product,
        images
      })
    }
    return {
      ...existSale.toJSON(),
      products,
    };
  }
}
