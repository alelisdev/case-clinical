
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEligibilityRequestDataAccessAdminService } from './api-eligibility-request-data-access-admin.service'
import { ApiEligibilityRequestDataAccessUserService } from './api-eligibility-request-data-access-user.service'
import { ApiEligibilityRequestDataAccessPublicService } from './api-eligibility-request-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEligibilityRequestDataAccessAdminService, ApiEligibilityRequestDataAccessUserService, ApiEligibilityRequestDataAccessPublicService],
  exports: [ApiEligibilityRequestDataAccessAdminService, ApiEligibilityRequestDataAccessUserService, ApiEligibilityRequestDataAccessPublicService],
})
export class ApiEligibilityRequestDataAccessModule {}
