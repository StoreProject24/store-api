import { AppError } from '@shared/helpers/response/response';
import { create, getLastSaleSequential } from '../repository/sale.repository';
import { CreateSaleBody } from '@shared/types/sale.types';
import { compareSaleWithProducts, getProductsToUpdate } from '@shared/utils/functions/saleWithProducts';
import { SaleRepository } from './sale.interface';
import { getStoreById } from '~modules/stores/repository/store.repository';
import { getProductsByIds, updateProductsQuantity } from '~modules/products/repository/product.repository';
import { HttpCode } from '@shared/helpers/response/response.type';

export class SaleDomain implements SaleRepository {
  // @ts-ignore
  async createSale(body: CreateSaleBody) {
    const store = await getStoreById(body.storeId);
    if (!store) {
      throw new AppError(HttpCode.NOT_FOUND, "Tienda no encontrada");
    }
    const products = await getProductsByIds(
      body.storeId,
      body.items.map((item) => item?.productId)
    );
    if (products.length !== body.items.length) {
      throw new AppError(HttpCode.NOT_FOUND, "Productos no encontrados");
    }
    // @ts-ignore
    compareSaleWithProducts(body.items, products, body.total)
    const saleSequence = await getLastSaleSequential(store.id)
    const sequential = saleSequence ? saleSequence.sequential + 1 : 1;
    await updateProductsQuantity(body.items);
    const sale = await create({
      ...body,
      sequential,
    });
    return sale;
  }
}
