
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBoardListDataAccessUserService } from './api-board-list-data-access-user.service'
import { ApiBoardListDataAccessPublicService } from './api-board-list-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ ApiBoardListDataAccessUserService, ApiBoardListDataAccessPublicService],
  exports: [ ApiBoardListDataAccessUserService, ApiBoardListDataAccessPublicService],
})
export class ApiBoardListDataAccessModule {}
