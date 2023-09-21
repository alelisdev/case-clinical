
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInsuranceTypeDataAccessAdminService } from './api-insurance-type-data-access-admin.service'
import { ApiInsuranceTypeDataAccessUserService } from './api-insurance-type-data-access-user.service'
import { ApiInsuranceTypeDataAccessPublicService } from './api-insurance-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInsuranceTypeDataAccessAdminService, ApiInsuranceTypeDataAccessUserService, ApiInsuranceTypeDataAccessPublicService],
  exports: [ApiInsuranceTypeDataAccessAdminService, ApiInsuranceTypeDataAccessUserService, ApiInsuranceTypeDataAccessPublicService],
})
export class ApiInsuranceTypeDataAccessModule {}
