
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCasePreInjuryDataAccessAdminService } from './api-case-pre-injury-data-access-admin.service'
import { ApiCasePreInjuryDataAccessUserService } from './api-case-pre-injury-data-access-user.service'
import { ApiCasePreInjuryDataAccessPublicService } from './api-case-pre-injury-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCasePreInjuryDataAccessAdminService, ApiCasePreInjuryDataAccessUserService, ApiCasePreInjuryDataAccessPublicService],
  exports: [ApiCasePreInjuryDataAccessAdminService, ApiCasePreInjuryDataAccessUserService, ApiCasePreInjuryDataAccessPublicService],
})
export class ApiCasePreInjuryDataAccessModule {}
