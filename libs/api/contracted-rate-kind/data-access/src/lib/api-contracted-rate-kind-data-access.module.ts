
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContractedRateKindDataAccessAdminService } from './api-contracted-rate-kind-data-access-admin.service'
import { ApiContractedRateKindDataAccessUserService } from './api-contracted-rate-kind-data-access-user.service'
import { ApiContractedRateKindDataAccessPublicService } from './api-contracted-rate-kind-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContractedRateKindDataAccessAdminService, ApiContractedRateKindDataAccessUserService, ApiContractedRateKindDataAccessPublicService],
  exports: [ApiContractedRateKindDataAccessAdminService, ApiContractedRateKindDataAccessUserService, ApiContractedRateKindDataAccessPublicService],
})
export class ApiContractedRateKindDataAccessModule {}
