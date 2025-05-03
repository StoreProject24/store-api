import { UserGet } from '@shared/types/user.types';

export interface UserRepository {
  getUser(id: number): Promise<any>;
}
