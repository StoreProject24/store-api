import { CreateSaleBody, Sale } from '@shared/types/sale.types';

export interface SaleRepository {
  createSale(body: CreateSaleBody): Promise<Sale>;
  getSalesByPage(storeId: number, limit: number, page: number, q: string, statuses: number[], date?: string): Promise<Sale[]>;
  changeSaleStatus(storeId: number, saleId: string, newStatus: number): Promise<Sale>;
}
