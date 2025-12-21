import { AppError } from '@shared/helpers/response/response';
import { create, getLastSaleSequential } from '../repository/sale.repository';
import { CreateSaleBody, SaleStatus } from '@shared/types/sale.types';
import { compareSaleWithProducts, getProductsToUpdate } from '@shared/utils/functions/saleWithProducts';
import { SaleRepository } from './sale.interface';
import { getStoreById } from '~modules/stores/repository/store.repository';
import { getProductsByIds, updateProductsQuantity } from '~modules/products/repository/product.repository';

export class SaleDomain implements SaleRepository {
  async createSale(body: CreateSaleBody) {
    const store = await getStoreById(body.storeId);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    const products = await getProductsByIds(
      body.storeId,
      body.items.map((item) => item.id)
    );
    if (products.length !== body.items.length) {
      throw new AppError(404, 'Products not found');
    }
    // compareSaleWithProducts(body, products);
    // const saleSequence = await getLastSaleSequential(body.storeId);
    // const sequential = saleSequence ? saleSequence.sequential + 1 : 1;
    // const sale = await create({
    //   ...body,
    //   sequential,
    // });
    // const productsToUpdate = getProductsToUpdate(sale.items, products, SaleStatus.pending);
    // await updateProductsQuantity(productsToUpdate);
    return null;
  }
}
