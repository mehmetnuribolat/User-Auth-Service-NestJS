import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../../../../app/core/abstracts';
import { IUserRepository } from './iRepository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model';
import { Model } from 'mongoose';
import { UserRepository } from './repository';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  public users: IUserRepository;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<User>,
  ) {}

  onApplicationBootstrap() {
    //PopulateOnFind = []
    this.users = new UserRepository(this.UserRepository, []);
  }
}
