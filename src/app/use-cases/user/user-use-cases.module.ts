import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserMappingProfile } from '../../use-cases/model-mappers';
import { UserUseCases } from './user.use-case';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { AuthServicesModule } from '../../services/auth-services/auth-services.module';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    AuthServicesModule,
    DataServicesModule,
  ],
  providers: [UserUseCases, UserMappingProfile],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
