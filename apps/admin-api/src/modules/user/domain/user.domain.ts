import { Request } from 'express';
import { findUserById, updateImage, updateUser } from '../repository/user.repository';
import { UserRepository } from './user.interface';
import { deleteImages, getSignedImageUrls, uploadImages } from '~services/image/image.service';
import { AppError } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';
import { User } from '~modules/auth/types/auth.types';

export class UserDomain implements UserRepository {
  async getUser(id: number) {
    const user = await findUserById(id);
    if (!user) {
      throw new AppError(HttpCode.NOT_FOUND, 'Usuario no existe');
    }
    const signedImageUrl = await getSignedImageUrls([user.urlImage])
    return {
      ...user,
      urlImage: signedImageUrl[0]
    }
  }

  async updateUser(userId: number, dataUser: User) {
    const user = await findUserById(userId)
    if (!user) {
      throw new AppError(HttpCode.NOT_FOUND, 'Usuario no existe');
    }
    const userUpdated = await updateUser(userId, dataUser)
    const signedImageUrl = await getSignedImageUrls([user.urlImage])
    return {
      ...userUpdated,
      urlImage: signedImageUrl[0]
    }
  }

  async updateImage(req: Request, storeId: number, userId: number) {
    const dirname = `users/${userId}`
    const user = await findUserById(userId)
    if (!user) {
      throw new AppError(HttpCode.NOT_FOUND, 'Usuario no existe');
    }
    if (user.urlImage) {
      await deleteImages([user.urlImage])
    }
    const imageUrls = await uploadImages(req, storeId, dirname)
    const userUpdate = await updateImage(userId, imageUrls[0])
    const signedImageUrl = await getSignedImageUrls([userUpdate.urlImage])
    return {
      ...userUpdate,
      urlImage: signedImageUrl[0]
    }
  }
}
