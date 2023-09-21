
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInsuranceSectorDataAccessAdminService } from './api-insurance-sector-data-access-admin.service'
import { ApiInsuranceSectorDataAccessUserService } from './api-insurance-sector-data-access-user.service'
import { ApiInsuranceSectorDataAccessPublicService } from './api-insurance-sector-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInsuranceSectorDataAccessAdminService, ApiInsuranceSectorDataAccessUserService, ApiInsuranceSectorDataAccessPublicService],
  exports: [ApiInsuranceSectorDataAccessAdminService, ApiInsuranceSectorDataAccessUserService, ApiInsuranceSectorDataAccessPublicService],
})
export class ApiInsuranceSectorDataAccessModule {}
