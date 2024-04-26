import { AppError } from '@config/helpers';
import { create, deleteCategory, findCategoryId, getAll, update, updateImage } from '../repository/category.repository';
import { CreateCategory, UpdateCategory, UpdateImageCategory } from '../types/category.types';
import { CategoryRepository } from './category.interface';
import { deleteImages, uploadImages } from '@services/image/image.service';
import { Request } from 'express';

export class CategoryDomain implements CategoryRepository {
  async createCategory(storeId: number, body: CreateCategory) {
    const category = await create(storeId, body);
    return category;
  }

  async updateCategory(storeId: number, body: UpdateCategory) {
    const currentCategory = await findCategoryId(body.id);
    if (!currentCategory) {
      throw new AppError(404, 'Not found category');
    }
    const category = await update(storeId, body.id, body);
    return category;
  }

  async updateImageCategory(body: UpdateImageCategory) {
    const currentCategory = await findCategoryId(body.categoryId);
    if (!currentCategory) {
      throw new AppError(404, 'Not found category');
    }
    if (currentCategory.urlImage !== body.urlImage) {
      await deleteImages([currentCategory.urlImage]);
    }
    const category = await updateImage(body);
    return category;
  }

  async getAllCategories(storeId: number) {
    const categories = await getAll(storeId);
    return categories;
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
