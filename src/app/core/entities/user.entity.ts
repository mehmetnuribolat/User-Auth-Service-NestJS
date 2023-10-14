import { AutoMap } from '@automapper/classes';
import { Types } from 'mongoose';

export class User {
  @AutoMap()
  public _id?: Types.ObjectId;
  @AutoMap()
  public email: string;
  @AutoMap()
  public phone_number: string;
  @AutoMap()
  public name: string;
  @AutoMap()
  public password: string;
  @AutoMap()
  public role: string;
  @AutoMap()
  public refresh_token?: string;
  @AutoMap()
  public reset_password_token?: string;
  @AutoMap()
  public reset_password_expire?: Date;
  @AutoMap()
  public is_active: boolean;
  @AutoMap()
  public last_login_at?: Date;
  @AutoMap()
  public created_at: Date;
  @AutoMap()
  public updated_at: Date;
}
