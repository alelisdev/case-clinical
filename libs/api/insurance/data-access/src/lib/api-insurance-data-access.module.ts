
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInsuranceDataAccessAdminService } from './api-insurance-data-access-admin.service'
import { ApiInsuranceDataAccessUserService } from './api-insurance-data-access-user.service'
import { ApiInsuranceDataAccessPublicService } from './api-insurance-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInsuranceDataAccessAdminService, ApiInsuranceDataAccessUserService, ApiInsuranceDataAccessPublicService],
  exports: [ApiInsuranceDataAccessAdminService, ApiInsuranceDataAccessUserService, ApiInsuranceDataAccessPublicService],
})
export class ApiInsuranceDataAccessModule {}
