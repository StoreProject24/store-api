import { findUserById } from '../repository/user.repository';
import { UserRepository } from './user.interface';

export class UserDomain implements UserRepository {
  async getUser(id: number) {
    return await findUserById(id);
  }
}
