import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateUserResponseDto,
  GetAllUsersResponseDto,
  GetSingleUserResponseDto,
  UserCreationDto,
  UserIdParamDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from '../../core/dtos/user';
import { UserUseCases } from '../../use-cases/user/user.use-case';
import { AccessTokenGuard } from '../guards/access_token.guard';
import { RolesGuard } from '../guards/role.guard';
import { RoleAllowed } from '../decorators/role.decorator';
import { UserRoles } from '../../constants/user_roles.constant';
import { GlobalResponseError } from '../../core/dtos/error/global-response-error.dto';
import { ResponseCode } from '../../constants';

@ApiTags('User')
@ApiBearerAuth('authorization')
@Controller('api/user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed(UserRoles.user_admin)
  @ApiOperation({ summary: 'Get All Users', description: 'Get All Users' })
  @ApiOkResponse({
    type: GetAllUsersResponseDto,
    description: 'All users data will be returned',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiForbiddenResponse({
    description: ResponseCode.ACCESS_DENIED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Get('/all')
  async GetAllUsers(): Promise<UserResponseDto[]> {
    return await this.userUseCases.getAllUsers();
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed(UserRoles.user_admin)
  @ApiOperation({ summary: 'Get User By Id', description: 'Get User Details' })
  @ApiOkResponse({
    type: GetSingleUserResponseDto,
    description: 'Single user will be returned',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiNotFoundResponse({
    description: ResponseCode.ENTITY_NOT_FOUND_ERROR.message,
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiForbiddenResponse({
    description: ResponseCode.ACCESS_DENIED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Get(':id')
  async GetUser(@Param() param: UserIdParamDto): Promise<UserResponseDto> {
    return await this.userUseCases.getUserById(param.id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed(UserRoles.user_admin)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Create New User', description: 'Create New User' })
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
    description: 'Created User Details',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiConflictResponse({
    description: ResponseCode.ENTITY_ALREADY_EXISTS_ERROR.message,
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiForbiddenResponse({
    description: ResponseCode.ACCESS_DENIED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Post('/create')
  public async CreateUser(
    @Body() body: UserCreationDto,
  ): Promise<UserResponseDto> {
    const rr = await this.userUseCases.createUser(body);
    return rr;
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed(UserRoles.user_admin)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Update User', description: 'Update User' })
  @ApiOkResponse({
    type: GetSingleUserResponseDto,
    description: 'Updated user details',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiConflictResponse({
    description: ResponseCode.ENTITY_NOT_FOUND_ERROR.message,
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiForbiddenResponse({
    description: ResponseCode.ACCESS_DENIED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Put('/:id')
  public async UpdateUser(
    @Param() param: UserIdParamDto,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userUseCases.updateUser(param, body);
  }
}
