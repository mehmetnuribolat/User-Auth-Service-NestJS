import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../../app/frameworks/data-services/mongo/model';
import { UsersSeeder } from './users.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:32770/user-service'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
