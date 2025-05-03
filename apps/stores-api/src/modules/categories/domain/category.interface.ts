import { CategoriesPublic } from '@shared/types/category.types';

export interface CategoryRepository {
  getCategories: (storeId: number) => Promise<CategoriesPublic[]>;
}
