
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBoardDataAccessUserService } from './api-board-data-access-user.service'
import { ApiBoardDataAccessPublicService } from './api-board-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ ApiBoardDataAccessUserService, ApiBoardDataAccessPublicService],
  exports: [ ApiBoardDataAccessUserService, ApiBoardDataAccessPublicService],
})
export class ApiBoardDataAccessModule {}
