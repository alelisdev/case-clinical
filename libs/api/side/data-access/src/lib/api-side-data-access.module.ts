
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiSideDataAccessAdminService } from './api-side-data-access-admin.service'
import { ApiSideDataAccessUserService } from './api-side-data-access-user.service'
import { ApiSideDataAccessPublicService } from './api-side-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSideDataAccessAdminService, ApiSideDataAccessUserService, ApiSideDataAccessPublicService],
  exports: [ApiSideDataAccessAdminService, ApiSideDataAccessUserService, ApiSideDataAccessPublicService],
})
export class ApiSideDataAccessModule {}
