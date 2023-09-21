
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiNegotiationDataAccessAdminService } from './api-negotiation-data-access-admin.service'
import { ApiNegotiationDataAccessUserService } from './api-negotiation-data-access-user.service'
import { ApiNegotiationDataAccessPublicService } from './api-negotiation-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNegotiationDataAccessAdminService, ApiNegotiationDataAccessUserService, ApiNegotiationDataAccessPublicService],
  exports: [ApiNegotiationDataAccessAdminService, ApiNegotiationDataAccessUserService, ApiNegotiationDataAccessPublicService],
})
export class ApiNegotiationDataAccessModule {}
