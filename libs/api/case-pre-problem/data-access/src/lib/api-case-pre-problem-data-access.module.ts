
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCasePreProblemDataAccessAdminService } from './api-case-pre-problem-data-access-admin.service'
import { ApiCasePreProblemDataAccessUserService } from './api-case-pre-problem-data-access-user.service'
import { ApiCasePreProblemDataAccessPublicService } from './api-case-pre-problem-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCasePreProblemDataAccessAdminService, ApiCasePreProblemDataAccessUserService, ApiCasePreProblemDataAccessPublicService],
  exports: [ApiCasePreProblemDataAccessAdminService, ApiCasePreProblemDataAccessUserService, ApiCasePreProblemDataAccessPublicService],
})
export class ApiCasePreProblemDataAccessModule {}
