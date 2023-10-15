import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../app/frameworks/data-services/mongo/model';
import { Seeder } from 'nestjs-seeder';
import { UserRoles } from 'src/app/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    // Insert into the database.
    const userDocument: UserDocument = new this.user({
      name: 'Administrator',
      email: 'admin@test.com',
      phone_number: '+9000000000',
      password: hashedPassword,
      role: UserRoles.user_admin,
    });
    return await userDocument.save().catch((err) => {
      throw new HttpException(err.message, 400);
    });
  }

  async drop(): Promise<any> {
    //return this.user.deleteMany({});
  }
}
