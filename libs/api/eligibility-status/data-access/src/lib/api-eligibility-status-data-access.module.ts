
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEligibilityStatusDataAccessAdminService } from './api-eligibility-status-data-access-admin.service'
import { ApiEligibilityStatusDataAccessUserService } from './api-eligibility-status-data-access-user.service'
import { ApiEligibilityStatusDataAccessPublicService } from './api-eligibility-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEligibilityStatusDataAccessAdminService, ApiEligibilityStatusDataAccessUserService, ApiEligibilityStatusDataAccessPublicService],
  exports: [ApiEligibilityStatusDataAccessAdminService, ApiEligibilityStatusDataAccessUserService, ApiEligibilityStatusDataAccessPublicService],
})
export class ApiEligibilityStatusDataAccessModule {}
