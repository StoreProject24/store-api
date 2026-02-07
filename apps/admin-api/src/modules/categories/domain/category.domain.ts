import { AppError } from '@shared/helpers/response/response';
import { create, deleteCategory, findCategoryId, getAll, update, updateImage } from '../repository/category.repository';
import { CreateCategory, UpdateImageCategory, Category } from '@shared/types/category.types';
import { CategoryRepository } from './category.interface';
import { deleteImages, getSignedImageUrls, uploadImages } from '~services/image/image.service';
import { Request } from 'express';
import { HttpCode } from '@shared/helpers/response/response.type';

export class CategoryDomain implements CategoryRepository {
  async createCategory(storeId: number, body: CreateCategory) {
    const category = await create(storeId, body);
    return category;
  }

  async updateCategory(storeId: number, body: Category) {
    const currentCategory = await findCategoryId(body.id);
    if (!currentCategory) {
      throw new AppError(HttpCode.NOT_FOUND, 'Categoria no encontrada');
    }
    const category = await update(storeId, body.id, body);
    return category;
  }

  async updateImageCategory(body: UpdateImageCategory) {
    const currentCategory = await findCategoryId(body.categoryId);
    if (!currentCategory) {
      throw new AppError(HttpCode.NOT_FOUND, 'Categoria no encontrada');
    }
    if (currentCategory.urlImage !== body.urlImage) {
      await deleteImages([currentCategory.urlImage]);
    }
    const category = await updateImage(body);
    return category;
  }

  async getAllCategories(storeId: number) {
    const categories = await getAll(storeId);
    const categoriesWithImage: Category[] = []
    for (const category of categories) {
      if (category.urlImage) {
        const urlImage = await getSignedImageUrls([category.urlImage])
        categoriesWithImage.push({
          ...category,
          urlImage: urlImage[0]
        })
      } else {
        categoriesWithImage.push(category)
      }
    }
    return categoriesWithImage
  }

  async deleteCategory(storeId: number, categoryId: number) {
    const response = await findCategoryId(categoryId);
    if (response?.urlImage) {
      await deleteImages([response.urlImage]);
    }
    return await deleteCategory(storeId, categoryId);
  }

  async uploadImageCategory(storeId: number, req: Request) {
    const images = await uploadImages(req, storeId, 'categories');
    return images;
  }
}
