import { AppError } from '@shared/helpers/response/response';
import { create, drop, getById, update } from '../repository/subcategories.repository';
import { Subcategory } from '@shared/types/subcategory.types';
import { SubcategoryRepository } from './subcategories.interface';

export class SubcategoriesDomain implements SubcategoryRepository {
  async createSubcategory(subcategory: Subcategory) {
    return await create(subcategory);
  }

  async updateSubcategory(storeId: number, subcategory: Subcategory) {
    const subCategory = await getById(subcategory.id);
    if (!subCategory) {
      throw new AppError(404, 'Subcategory not found');
    }
    if (subCategory.storeId !== storeId) {
      throw new AppError(404, 'Subcategory not found');
    }
    return await update({
      ...subcategory,
      id: subCategory.id,
    });
  }

  async deleteSubcategory(storeId: number, id: number) {
    const subcategory = await getById(id);
    if (!subcategory) {
      throw new AppError(404, 'Subcategory not found');
    }
    if (subcategory.storeId !== storeId) {
      throw new AppError(404, 'Subcategory not found');
    }
    return await drop(id);
  }

  async getSubcategoryById(id: number) {
    return await getById(id);
  }
}
