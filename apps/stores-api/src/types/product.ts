import { Product } from "@shared/types/product.types";

export type ProductUser = Omit<Product, 'price'>