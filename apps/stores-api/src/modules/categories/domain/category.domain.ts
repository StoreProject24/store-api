import { getCategories } from '../repository/category.repository';
import { CategoryRepository } from './category.interface';

export class CategoryDomain implements CategoryRepository {
  async getCategories(storeId: number) {
    const categories = await getCategories(storeId);
    return categories;
  }
}
