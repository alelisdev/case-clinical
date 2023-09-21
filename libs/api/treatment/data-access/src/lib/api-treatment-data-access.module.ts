
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTreatmentDataAccessAdminService } from './api-treatment-data-access-admin.service'
import { ApiTreatmentDataAccessUserService } from './api-treatment-data-access-user.service'
import { ApiTreatmentDataAccessPublicService } from './api-treatment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTreatmentDataAccessAdminService, ApiTreatmentDataAccessUserService, ApiTreatmentDataAccessPublicService],
  exports: [ApiTreatmentDataAccessAdminService, ApiTreatmentDataAccessUserService, ApiTreatmentDataAccessPublicService],
})
export class ApiTreatmentDataAccessModule {}
