import { CreateSaleBody, Sale } from '@shared/types/sale.types';

export interface SaleRepository {
  createSale(body: CreateSaleBody): Promise<Sale>;
}
