import { AppError } from '~config/helpers';
import {
  create,
  deleteSale,
  getLastSaleSequential,
  getSaleById,
  getSalesByStore,
  updateStatusSale,
} from '../repository/sale.repository';
import { SaleRepository } from './sale.interface';
import { CreateSaleBody, SaleStatus } from '../types/sale.types';
import { convertToObjectId } from '../utils/convetObjetId';
import { ProductsDomain } from '~modules/products/domain/products.domain';

export class SaleDomain implements SaleRepository {
  async createSale(body: CreateSaleBody) {
    const saleSequence = await getLastSaleSequential(body.storeId);
    let sequential = 0;
    if (saleSequence) {
      sequential = saleSequence.sequential + 1;
    }
    return await create({
      ...body,
      sequential,
    });
  }

  async getSalesByPage(storeId: number, limit: number, page: number, status: SaleStatus | null) {
    return await getSalesByStore(storeId, page, limit, status);
  }

  async changeSaleStatus(storeId: number, saleId: string, newStatus: SaleStatus) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(404, 'Venta no encontrada');
    }
    return await updateStatusSale(storeId, convertToObjectId(saleId), newStatus);
  }

  async deleteSaleByStore(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(404, 'Venta no encontrada');
    }
    return await deleteSale(storeId, convertToObjectId(saleId));
  }

  async getSaleProducts(storeId: number, saleId: string) {
    const existSale = await getSaleById(storeId, convertToObjectId(saleId));
    if (!existSale) {
      throw new AppError(404, 'Venta no encontrada');
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
