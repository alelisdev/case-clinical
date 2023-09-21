
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseTypeDataAccessAdminService } from './api-case-type-data-access-admin.service'
import { ApiCaseTypeDataAccessUserService } from './api-case-type-data-access-user.service'
import { ApiCaseTypeDataAccessPublicService } from './api-case-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseTypeDataAccessAdminService, ApiCaseTypeDataAccessUserService, ApiCaseTypeDataAccessPublicService],
  exports: [ApiCaseTypeDataAccessAdminService, ApiCaseTypeDataAccessUserService, ApiCaseTypeDataAccessPublicService],
})
export class ApiCaseTypeDataAccessModule {}
