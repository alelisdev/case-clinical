
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClaimStatusDataAccessAdminService } from './api-claim-status-data-access-admin.service'
import { ApiClaimStatusDataAccessUserService } from './api-claim-status-data-access-user.service'
import { ApiClaimStatusDataAccessPublicService } from './api-claim-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClaimStatusDataAccessAdminService, ApiClaimStatusDataAccessUserService, ApiClaimStatusDataAccessPublicService],
  exports: [ApiClaimStatusDataAccessAdminService, ApiClaimStatusDataAccessUserService, ApiClaimStatusDataAccessPublicService],
})
export class ApiClaimStatusDataAccessModule {}
