import { getSignedImageUrls } from '~services/image/image.service';
import { getCategories } from '../repository/category.repository';
import { CategoryRepository } from './category.interface';
import { CategoriesPublic } from '@shared/types/category.types';

export class CategoryDomain implements CategoryRepository {
  async getCategories(storeId: number) {
    const categories = await getCategories(storeId);
    const categoriesWithImage: CategoriesPublic[] = []
    for (const category of categories) {
      if (category.urlImage){
        const url = await getSignedImageUrls([category.urlImage])
        categoriesWithImage.push({
          ...category,
          urlImage: url[0]
        })
      }else {
        categoriesWithImage.push(category)
      }
    }
    return categoriesWithImage;
  }
}
