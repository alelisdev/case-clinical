
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiReferralRequestDataAccessAdminService } from './api-referral-request-data-access-admin.service'
import { ApiReferralRequestDataAccessUserService } from './api-referral-request-data-access-user.service'
import { ApiReferralRequestDataAccessPublicService } from './api-referral-request-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiReferralRequestDataAccessAdminService, ApiReferralRequestDataAccessUserService, ApiReferralRequestDataAccessPublicService],
  exports: [ApiReferralRequestDataAccessAdminService, ApiReferralRequestDataAccessUserService, ApiReferralRequestDataAccessPublicService],
})
export class ApiReferralRequestDataAccessModule {}
