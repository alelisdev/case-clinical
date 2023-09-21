import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBoardCardDataAccessUserService } from './api-board-card-data-access-user.service'
import { ApiBoardCardDataAccessPublicService } from './api-board-card-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ ApiBoardCardDataAccessUserService, ApiBoardCardDataAccessPublicService],
  exports: [ ApiBoardCardDataAccessUserService, ApiBoardCardDataAccessPublicService],
})
export class ApiBoardCardDataAccessModule {}
