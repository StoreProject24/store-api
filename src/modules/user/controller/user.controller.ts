import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers';
import { verifytoken } from '~middlewares/verifyToken.middleware';
import { UserDomain } from '../domain/user.domain';

export const UserController = Router();

UserController.get('/', verifytoken, async (req: Request, res: Response) => {
  try {
    const userDomain = new UserDomain();
    const user = await userDomain.getUser(req.user.id);
    handleSuccess(res, 200, { user });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});
