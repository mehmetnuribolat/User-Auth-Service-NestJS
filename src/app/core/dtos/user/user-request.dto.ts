import { AutoMap } from '@automapper/classes';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type as validateType } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserRoles } from 'src/app/constants';

export class UserIdParamDto {
  @ApiProperty({
    description: 'user_id',
    example: '',
    required: true,
  })
  @IsDefined()
  public id!: string;
}

export class UserCreationDto {
  @ApiProperty({
    description: 'email',
    example: 'hello@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  @AutoMap()
  public email!: string;

  @ApiProperty({
    description: 'phone number',
    example: '+905420000000',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsPhoneNumber('TR')
  @AutoMap()
  public phone_number!: string;

  @ApiProperty({
    description: 'name',
    example: 'john summer',
    required: true,
  })
  @IsDefined()
  @IsString()
  @AutoMap()
  public name!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @AutoMap()
  public password!: string;

  @IsEnum(UserRoles)
  public role!: string;
}

export class UserAppPermissionUpdateRequestDto {
  @ApiProperty({
    description: 'uuid user_id',
    example: '',
    required: true,
  })
  @IsUUID()
  @IsDefined()
  @AutoMap()
  public user_id!: string;

  @ApiProperty({
    description: 'App Role Id',
    example: '',
    required: true,
  })
  @IsDefined()
  @AutoMap()
  public app_role_id!: number;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  old_password: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  new_password: string;
}

export class UserUpdateDto {
  @ApiProperty({
    description: 'phone number',
    example: '+905420000000',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsPhoneNumber('TR')
  @AutoMap()
  public phone_number!: string;

  @ApiProperty({
    description: 'name',
    example: 'john summer',
    required: true,
  })
  @IsDefined()
  @IsString()
  @AutoMap()
  public name!: string;
}

export class UserUpdateRequestDto extends PartialType(UserUpdateDto) {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @validateType(() => UpdatePasswordDto)
  @ApiProperty({ type: () => UpdatePasswordDto })
  public password_update?: UpdatePasswordDto;
}
