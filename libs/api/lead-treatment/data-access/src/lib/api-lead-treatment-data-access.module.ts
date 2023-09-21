
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadTreatmentDataAccessAdminService } from './api-lead-treatment-data-access-admin.service'
import { ApiLeadTreatmentDataAccessUserService } from './api-lead-treatment-data-access-user.service'
import { ApiLeadTreatmentDataAccessPublicService } from './api-lead-treatment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLeadTreatmentDataAccessAdminService, ApiLeadTreatmentDataAccessUserService, ApiLeadTreatmentDataAccessPublicService],
  exports: [ApiLeadTreatmentDataAccessAdminService, ApiLeadTreatmentDataAccessUserService, ApiLeadTreatmentDataAccessPublicService],
})
export class ApiLeadTreatmentDataAccessModule {}
