
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClaimDataAccessAdminService } from './api-claim-data-access-admin.service'
import { ApiClaimDataAccessUserService } from './api-claim-data-access-user.service'
import { ApiClaimDataAccessPublicService } from './api-claim-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClaimDataAccessAdminService, ApiClaimDataAccessUserService, ApiClaimDataAccessPublicService],
  exports: [ApiClaimDataAccessAdminService, ApiClaimDataAccessUserService, ApiClaimDataAccessPublicService],
})
export class ApiClaimDataAccessModule {}
