import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('/health')
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @ApiOperation({
    summary: 'Health Check Service',
    description: 'Checks the health of Mongoose',
  })
  @ApiOkResponse({ description: 'returns the health check' })
  @HealthCheck()
  @Get()
  getHello() {
    return this.health.check([async () => this.db.pingCheck('mongodb')]);
  }
}
