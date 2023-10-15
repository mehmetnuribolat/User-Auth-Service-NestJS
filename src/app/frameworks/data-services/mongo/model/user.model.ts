import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  public phone_number!: string;

  @Prop()
  public name!: string;

  @Prop()
  public password!: string;

  @Prop()
  public role: string;

  @Prop({ isRequired: false, default: null })
  public refresh_token?: string;

  @Prop({ isRequired: false, default: null })
  public reset_password_token?: string;

  @Prop({ isRequired: false, default: null })
  public reset_password_expire?: Date;

  @Prop({ default: true })
  public is_active: boolean;

  @Prop({ isRequired: false, default: null })
  public last_login_at?: Date;

  @Prop({ default: now() })
  public created_at: Date;

  @Prop({ default: now() })
  public updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
