import { User } from '../model';
import { IUserRepository } from '../iRepository/IUserRepository.repository';
import { Model } from 'mongoose';

export class UserRepository implements IUserRepository {
  private _repository: Model<User>;
  private _populateOnFind: string[];

  constructor(repository: Model<User>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getById(id: any): Promise<User> {
    return await this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .lean()
      .exec();
  }
  async getByEmail(user_email: string): Promise<User> {
    return await this._repository.findOne({ email: user_email }).lean().exec();
  }
  async getAll(): Promise<User[]> {
    return await this._repository
      .find()
      .populate(this._populateOnFind)
      .lean()
      .exec();
  }
  async create(item: User): Promise<User> {
    return await this._repository.create(item);
  }
  async update(id: any, item: User): Promise<User> {
    item.updated_at = new Date();
    return await this._repository.findByIdAndUpdate(id, item);
  }
}
