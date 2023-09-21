
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBatchControlDataAccessAdminService } from './api-batch-control-data-access-admin.service'
import { ApiBatchControlDataAccessUserService } from './api-batch-control-data-access-user.service'
import { ApiBatchControlDataAccessPublicService } from './api-batch-control-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBatchControlDataAccessAdminService, ApiBatchControlDataAccessUserService, ApiBatchControlDataAccessPublicService],
  exports: [ApiBatchControlDataAccessAdminService, ApiBatchControlDataAccessUserService, ApiBatchControlDataAccessPublicService],
})
export class ApiBatchControlDataAccessModule {}
