
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFirmDataAccessAdminService } from './api-firm-data-access-admin.service'
import { ApiFirmDataAccessUserService } from './api-firm-data-access-user.service'
import { ApiFirmDataAccessPublicService } from './api-firm-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFirmDataAccessAdminService, ApiFirmDataAccessUserService, ApiFirmDataAccessPublicService],
  exports: [ApiFirmDataAccessAdminService, ApiFirmDataAccessUserService, ApiFirmDataAccessPublicService],
})
export class ApiFirmDataAccessModule {}
