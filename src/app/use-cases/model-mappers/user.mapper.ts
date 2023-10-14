import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  UserCreationDto,
  UserCreationResponseDto,
  UserResponseDto,
} from '../../core/dtos/user';
import { User } from '../../core/entities';

@Injectable()
export class UserMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserCreationDto, User);
      createMap(mapper, User, UserCreationResponseDto);
      createMap(
        mapper,
        User,
        UserResponseDto,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.name),
        ),
        forMember(
          (d) => d.email,
          mapFrom((s) => s.email),
        ),
        forMember(
          (d) => d.phone_number,
          mapFrom((s) => s.phone_number),
        ),
      );
    };
  }
}
