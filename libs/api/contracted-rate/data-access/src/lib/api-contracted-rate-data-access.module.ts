
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContractedRateDataAccessAdminService } from './api-contracted-rate-data-access-admin.service'
import { ApiContractedRateDataAccessUserService } from './api-contracted-rate-data-access-user.service'
import { ApiContractedRateDataAccessPublicService } from './api-contracted-rate-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContractedRateDataAccessAdminService, ApiContractedRateDataAccessUserService, ApiContractedRateDataAccessPublicService],
  exports: [ApiContractedRateDataAccessAdminService, ApiContractedRateDataAccessUserService, ApiContractedRateDataAccessPublicService],
})
export class ApiContractedRateDataAccessModule {}
