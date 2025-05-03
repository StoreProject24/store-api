import { CreateSaleBody, Sale, SaleStatus } from '@shared/types/sale.types';

export interface SaleRepository {
  createSale(body: CreateSaleBody): Promise<Sale>;
}
