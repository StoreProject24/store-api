import type { AuthenticatedUser } from '../../libs/shared/types/auth.types';

export {};

declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
      store: {
        id: number;
        name: string;
      };
    }
  }
}
