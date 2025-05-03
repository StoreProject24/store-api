import { AppError } from '@shared/helpers/response/response';
import { Product } from '@shared/types/product.types';
import { CreateSaleBody, SaleItem, SaleStatus } from '@shared/types/sale.types';

const compareSaleWithProducts = (sale: CreateSaleBody, products: Product[]) => {
  for (const item of sale.items) {
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    if (product.quantity < item.quantity) {
      throw new AppError(400, 'Product not have enough quantity');
    }
    if (product.pricePublic !== item.price) {
      throw new AppError(400, 'Product price is different');
    }
  }
  return true;
};

const getProductsToUpdate = (items: SaleItem[], products: Product[], status: SaleStatus) => {
  const productsToUpdate = [];
  for (const item of items) {
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    if (status === SaleStatus.cancelled) {
      product.quantity += item.quantity;
    } else {
      product.quantity -= item.quantity;
    }
    productsToUpdate.push({
      id: product.id,
      quantity: product.quantity,
    });
  }
  return productsToUpdate;
};

export { compareSaleWithProducts, getProductsToUpdate };
