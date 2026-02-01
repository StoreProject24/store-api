import { AppError } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';
import { Product } from '@shared/types/product.types';
import { SaleItem } from '@shared/types/sale.types';
import { STATUS } from '@shared/types/status.types';

const compareSaleWithProducts = (items: SaleItem[], products: Product[], totalValue: number) => {
  let auxTotalValue = 0
  for (const item of items) {
    const product = products.find((product) => product.id === item.productId);
    if (!product) {
      throw new AppError(HttpCode.NOT_FOUND, "Producto no encontrado");
    }
    // Producto con variante
    if (item.combinationId){
      const findCombination = product.variantCombinations.find((vc) => vc.id === item.combinationId)
      if (!findCombination){
        throw new AppError(HttpCode.BAD_REQUEST, "Combinacion no encontrada");
      }
      if (findCombination.quantity === 0 || !findCombination.status || findCombination.quantity < item.quantity){
        throw new AppError(HttpCode.BAD_REQUEST, "No hay stock para este producto");
      }
      if (findCombination.pricePublic !== item.pricePublic){
        throw new AppError(HttpCode.BAD_REQUEST, "Tu precio es diferente al del producto");
      }
      auxTotalValue+=(findCombination.pricePublic * item.quantity)
    }else {
      // Producto sin variante
      if (product.quantity < item.quantity) {
        throw new AppError(HttpCode.BAD_REQUEST, `Falta stock para este producto ${item.name} ${item.variantName && `- ${item.variantName}`}`);
      }
      if (product.pricePublic !== item.pricePublic) {
        throw new AppError(HttpCode.BAD_REQUEST, "Tu precio es diferente al del producto");
      }
      auxTotalValue+=(product.pricePublic * item.quantity)
    }
  }
  if (totalValue !== auxTotalValue) {
    throw new AppError(HttpCode.BAD_REQUEST, "El precio total de la compra no es igual a lo que realmente es");
  }
  return true;
};

const getProductsToUpdate = (items: SaleItem[], products: Product[], statusId: number) => {
  // const productsToUpdate = [];
  // for (const item of items) {
  //   const product = products.find((product) => product.id === item.id);
  //   if (!product) {
  //     throw new AppError(HttpCode.NOT_FOUND, 'Producto no encontrado');
  //   }
  //   if (status === SaleStatus.cancelled) {
  //     product.quantity += item.quantity;
  //   } else {
  //     product.quantity -= item.quantity;
  //   }
  //   productsToUpdate.push({
  //     id: product.id,
  //     quantity: product.quantity,
  //   });
  // }
  // return productsToUpdate;
};

export { compareSaleWithProducts, getProductsToUpdate };
