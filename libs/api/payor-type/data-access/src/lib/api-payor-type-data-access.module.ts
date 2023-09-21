
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPayorTypeDataAccessAdminService } from './api-payor-type-data-access-admin.service'
import { ApiPayorTypeDataAccessUserService } from './api-payor-type-data-access-user.service'
import { ApiPayorTypeDataAccessPublicService } from './api-payor-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPayorTypeDataAccessAdminService, ApiPayorTypeDataAccessUserService, ApiPayorTypeDataAccessPublicService],
  exports: [ApiPayorTypeDataAccessAdminService, ApiPayorTypeDataAccessUserService, ApiPayorTypeDataAccessPublicService],
})
export class ApiPayorTypeDataAccessModule {}
