import { User } from '../model';

export abstract class IUserRepository {
  abstract getById(id: string): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract create(item: User): Promise<User>;

  abstract update(id: any, item: User): Promise<User>;

  abstract getByEmail(user_email: string): Promise<User>;
}
