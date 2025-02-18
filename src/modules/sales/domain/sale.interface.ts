import { CreateSaleBody, Sale, SaleStatus } from '../types/sale.types';

export interface SaleRepository {
  createSale(body: CreateSaleBody): Promise<Sale>;
  getSalesByPage(storeId: number, limit: number, page: number, status: SaleStatus): Promise<Sale[]>;
  changeSaleStatus(storeId: number, saleId: string, newStatus: SaleStatus): Promise<Sale>;
}
