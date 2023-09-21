
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCasePreAccidentDataAccessAdminService } from './api-case-pre-accident-data-access-admin.service'
import { ApiCasePreAccidentDataAccessUserService } from './api-case-pre-accident-data-access-user.service'
import { ApiCasePreAccidentDataAccessPublicService } from './api-case-pre-accident-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCasePreAccidentDataAccessAdminService, ApiCasePreAccidentDataAccessUserService, ApiCasePreAccidentDataAccessPublicService],
  exports: [ApiCasePreAccidentDataAccessAdminService, ApiCasePreAccidentDataAccessUserService, ApiCasePreAccidentDataAccessPublicService],
})
export class ApiCasePreAccidentDataAccessModule {}
