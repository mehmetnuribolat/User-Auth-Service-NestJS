import { Injectable } from '@nestjs/common/decorators';
import { User } from '../../core/entities/user.entity';
import {
  UserCreationDto,
  UserCreationResponseDto,
  UserIdParamDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from '../../core/dtos/user';
import { IDataServices } from '../../core/abstracts/data-services.abstract';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IBcryptService } from '../../core/abstracts/bcrypt-service.abstract';
import { nameof } from '../../../helpers';

@Injectable()
export class UserUseCases {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private bcryptServices: IBcryptService,
    private dataServices: IDataServices,
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.dataServices.users.getAll();
    const usersToReturn = this.classMapper.mapArray(
      users,
      User,
      UserResponseDto,
    );
    return usersToReturn;
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.dataServices.users.getById(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const userToReturn = this.classMapper.map(user, User, UserResponseDto);
    return userToReturn;
  }

  async createUser(
    userData: UserCreationDto,
  ): Promise<UserCreationResponseDto> {
    const isUserExists = await this.dataServices.users.getByEmail(
      userData.email,
    );

    if (isUserExists) {
      throw new ConflictException('User with email already exists');
    }

    const passHash = await this.bcryptServices.hash(userData.password);

    userData.password = passHash;
    userData.email = userData?.email.toLowerCase();

    const userEntity = this.classMapper.map(userData, UserCreationDto, User);
    userEntity.updated_at = new Date();
    userEntity.created_at = new Date();

    let user: User | null;
    try {
      user = await this.dataServices.users.create(userEntity);
    } catch (err) {
      throw new InternalServerErrorException(
        'Error occured while creating new user',
      );
    }

    const userToReturn = this.classMapper.map(
      user,
      User,
      UserCreationResponseDto,
    );
    return userToReturn;
  }

  async updateUser(
    userIdData: UserIdParamDto,
    userData: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    const user = (await this.dataServices.users.getById(userIdData.id)) as User;

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    const fieldToUpdate: any = {};
    if (userData.password_update && userData.password_update.new_password) {
      const shouldAllowUpdate = await this.bcryptServices.compare(
        userData.password_update.old_password,
        user.password,
      );
      if (shouldAllowUpdate) {
        const newPassHash = await this.bcryptServices.hash(
          userData.password_update.new_password,
        );
        fieldToUpdate.password = newPassHash;
      }
    }

    for (const key in userData) {
      if (
        typeof fieldToUpdate[key] !== undefined &&
        key !== undefined &&
        key !== nameof<UserUpdateRequestDto>('password_update')
      ) {
        fieldToUpdate[key] = userData[key];
      }
    }

    let usert: User;
    if (Object.entries(fieldToUpdate).length > 0) {
      const userToSave: User = { ...user, ...fieldToUpdate };
      usert = await this.dataServices.users.update(userIdData.id, userToSave);
      return this.classMapper.map(usert, User, UserResponseDto);
    } else {
      throw new BadRequestException('There is no any field to update !');
    }
  }
}
