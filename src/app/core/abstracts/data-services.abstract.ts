import { IUserRepository } from '../../frameworks/data-services/mongo/iRepository';

export abstract class IDataServices {
  abstract users: IUserRepository;
}
