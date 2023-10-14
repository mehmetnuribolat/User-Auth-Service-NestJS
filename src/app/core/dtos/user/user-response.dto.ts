import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { HttpRestApiResponse } from '../response/global-response.dto';

export class UserResponseDto {
  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  @AutoMap()
  public id: string;

  @ApiResponseProperty({
    example: 'user@gmail.com',
  })
  @AutoMap()
  public email: string;

  @ApiResponseProperty({
    example: '+905420000000',
  })
  @AutoMap()
  public phone_number!: string;

  @ApiResponseProperty({
    example: 'john summer',
  })
  @AutoMap()
  public name!: string;
}

export class UserCreationResponseDto extends UserResponseDto {}

export class GetAllUsersResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  public data: UserResponseDto[];
}
export class GetSingleUserResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: UserResponseDto })
  public data: UserResponseDto;
}

export class CreateUserResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: UserCreationResponseDto })
  public data: UserCreationResponseDto;
}
