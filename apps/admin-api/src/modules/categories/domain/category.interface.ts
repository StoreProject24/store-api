import { Category, CreateCategory, UpdateImageCategory } from '@shared/types/category.types';

export interface CategoryRepository {
  createCategory: (storeId: number, category: CreateCategory) => Promise<Category>;
  deleteCategory: (storeId: number, categoryId: number) => Promise<void>;
  updateCategory: (storeId: number, category: Category) => Promise<Category>;
  getAllCategories: (storeId: number) => Promise<Category[]>;
  updateImageCategory: (body: UpdateImageCategory) => Promise<Category>;
}
