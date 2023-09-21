
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseAccountDataAccessAdminService } from './api-case-account-data-access-admin.service'
import { ApiCaseAccountDataAccessUserService } from './api-case-account-data-access-user.service'
import { ApiCaseAccountDataAccessPublicService } from './api-case-account-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseAccountDataAccessAdminService, ApiCaseAccountDataAccessUserService, ApiCaseAccountDataAccessPublicService],
  exports: [ApiCaseAccountDataAccessAdminService, ApiCaseAccountDataAccessUserService, ApiCaseAccountDataAccessPublicService],
})
export class ApiCaseAccountDataAccessModule {}
