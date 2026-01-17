import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyToken } from '~middlewares/verifyToken.middleware';
import { UserDomain } from '../domain/user.domain';
import { HttpCode } from '@shared/helpers/response/response.type';

export const UserController = Router();

UserController.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userDomain = new UserDomain();
    const user = await userDomain.getUser(req.user.id);
    handleSuccess(res, HttpCode.OK, { user });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
