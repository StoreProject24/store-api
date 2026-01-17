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
import { CreateSaleBody, Sale, SaleItem, SaleStatus } from '@shared/types/sale.types';
import { compareSaleWithProducts, getProductsToUpdate } from '@shared/utils/functions/saleWithProducts';
import { convertToObjectId } from '../utils/convetObjetId';
import { ProductsDomain } from '~modules/products/domain/products.domain';
import { getProductsByIds, updateProductsQuantity } from '~modules/products/repository/products.repository';
import { HttpCode } from '@shared/helpers/response/response.type';

export class SaleDomain implements SaleRepository {
  async createSale(body: CreateSaleBody) {
    const products = await getProductsByIds(
      body.storeId,
      body.items.map((item) => item.productId)
    );
    if (products.length !== body.items.length) {
      throw new AppError(HttpCode.NOT_FOUND, 'Productos no encontrados');
    }
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

  async getSalesByPage(storeId: number, limit: number, page: number, status: SaleStatus | null) {
    return await getSalesByStore(storeId, page, limit, status);
  }

  async changeSaleStatus(storeId: number, saleId: string, newStatus: SaleStatus) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    if (existSale.status === SaleStatus.deleted) {
      throw new AppError(HttpCode.BAD_REQUEST, 'La venta no puede ser cancelada porque ya fue eliminada');
    }
    if (existSale.status === SaleStatus.paid) {
      throw new AppError(HttpCode.BAD_REQUEST, 'La venta no puede ser cancelada porque ya fue pagada');
    }
    if (newStatus === SaleStatus.cancelled) {
      const products = await getProductsByIds(
        storeId,
        existSale.items.map((item) => item.id)
      );
      const mappedItems: SaleItem[] = existSale.items.map((item) => ({
        id: item.id,
        productId: item.id,
        productName: item.name,
        discount: item.discount ?? 0,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));
      // const productsToUpdate = getProductsToUpdate(mappedItems, products, SaleStatus.cancelled);
      // await updateProductsQuantity(productsToUpdate);
    }
    return await updateStatusSale(storeId, convertToObjectId(saleId), newStatus);
  }

  async deleteSaleByStore(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    return await deleteSale(storeId, convertToObjectId(saleId));
  }

  async getSaleProducts(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(HttpCode.NOT_FOUND, 'Venta no encontrada');
    }
    const products = [];
    const productDomain = new ProductsDomain();
    for (const item of existSale.toJSON().items) {
      try {
        const product = await productDomain.getProductById(storeId, item.id);
        if (product) {
          products.push(product);
        }
      } catch (error) {}
    }
    return {
      ...existSale.toJSON(),
      products,
    };
  }
}
