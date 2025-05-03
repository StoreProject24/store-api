import { Subcategory } from '@shared/types/subcategory.types';

export interface SubcategoryRepository {
  createSubcategory: (subcategory: Subcategory) => Promise<Subcategory>;
  updateSubcategory: (id: number, subcategory: Subcategory) => Promise<Subcategory>;
  deleteSubcategory: (storeId: number, id: number) => Promise<void>;
  getSubcategoryById: (id: number) => Promise<Subcategory | null>;
}
