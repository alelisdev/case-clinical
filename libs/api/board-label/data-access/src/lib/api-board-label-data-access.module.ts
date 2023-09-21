
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBoardLabelDataAccessUserService } from './api-board-label-data-access-user.service'
import { ApiBoardLabelDataAccessPublicService } from './api-board-label-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ ApiBoardLabelDataAccessUserService, ApiBoardLabelDataAccessPublicService],
  exports: [ ApiBoardLabelDataAccessUserService, ApiBoardLabelDataAccessPublicService],
})
export class ApiBoardLabelDataAccessModule {}
