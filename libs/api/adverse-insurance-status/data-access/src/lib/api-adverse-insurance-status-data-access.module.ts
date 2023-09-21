
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAdverseInsuranceStatusDataAccessAdminService } from './api-adverse-insurance-status-data-access-admin.service'
import { ApiAdverseInsuranceStatusDataAccessUserService } from './api-adverse-insurance-status-data-access-user.service'
import { ApiAdverseInsuranceStatusDataAccessPublicService } from './api-adverse-insurance-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAdverseInsuranceStatusDataAccessAdminService, ApiAdverseInsuranceStatusDataAccessUserService, ApiAdverseInsuranceStatusDataAccessPublicService],
  exports: [ApiAdverseInsuranceStatusDataAccessAdminService, ApiAdverseInsuranceStatusDataAccessUserService, ApiAdverseInsuranceStatusDataAccessPublicService],
})
export class ApiAdverseInsuranceStatusDataAccessModule {}
