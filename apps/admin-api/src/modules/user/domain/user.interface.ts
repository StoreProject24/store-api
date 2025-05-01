import { UserGet } from '../types/user.types';

export interface UserRepository {
  getUser(id: number): Promise<any>;
}
