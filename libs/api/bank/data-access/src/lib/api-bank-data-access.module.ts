
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBankDataAccessAdminService } from './api-bank-data-access-admin.service'
import { ApiBankDataAccessUserService } from './api-bank-data-access-user.service'
import { ApiBankDataAccessPublicService } from './api-bank-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBankDataAccessAdminService, ApiBankDataAccessUserService, ApiBankDataAccessPublicService],
  exports: [ApiBankDataAccessAdminService, ApiBankDataAccessUserService, ApiBankDataAccessPublicService],
})
export class ApiBankDataAccessModule {}
