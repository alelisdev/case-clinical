
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiHealthInsuranceDataAccessAdminService } from './api-health-insurance-data-access-admin.service'
import { ApiHealthInsuranceDataAccessUserService } from './api-health-insurance-data-access-user.service'
import { ApiHealthInsuranceDataAccessPublicService } from './api-health-insurance-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiHealthInsuranceDataAccessAdminService, ApiHealthInsuranceDataAccessUserService, ApiHealthInsuranceDataAccessPublicService],
  exports: [ApiHealthInsuranceDataAccessAdminService, ApiHealthInsuranceDataAccessUserService, ApiHealthInsuranceDataAccessPublicService],
})
export class ApiHealthInsuranceDataAccessModule {}
