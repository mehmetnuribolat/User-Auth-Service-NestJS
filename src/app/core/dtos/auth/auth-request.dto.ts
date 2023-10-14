import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({
    description: 'email',
    example: 'hello@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'password',
    example: '23232323dsa',
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public password!: string;
}
export class ResetPasswordDto {
  @ApiProperty({
    description: 'email',
    example: 'hello@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'password',
    example: '23232323dsa',
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public new_password!: string;

  @ApiProperty({
    description: 'password_token',
    example: '23232323dsa',
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public password_token!: string;
}

export class VerifyTokenDto {
  @ApiProperty({
    description: 'jwt_token',
    example: 'hdsajhdkjajkdhskjahdkjsahkjdaskjdhksahdkjshakjdhaskjdsa',
    required: true,
  })
  @IsDefined()
  @IsString()
  public jwt_token!: string;
}

export class EmailParamDto {
  @ApiProperty({
    description: 'email',
    example: '',
    required: true,
  })
  @IsEmail()
  @IsDefined()
  @IsString()
  public email!: string;
}
