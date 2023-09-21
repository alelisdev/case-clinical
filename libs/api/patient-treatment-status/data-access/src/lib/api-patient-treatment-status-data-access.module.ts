
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPatientTreatmentStatusDataAccessAdminService } from './api-patient-treatment-status-data-access-admin.service'
import { ApiPatientTreatmentStatusDataAccessUserService } from './api-patient-treatment-status-data-access-user.service'
import { ApiPatientTreatmentStatusDataAccessPublicService } from './api-patient-treatment-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPatientTreatmentStatusDataAccessAdminService, ApiPatientTreatmentStatusDataAccessUserService, ApiPatientTreatmentStatusDataAccessPublicService],
  exports: [ApiPatientTreatmentStatusDataAccessAdminService, ApiPatientTreatmentStatusDataAccessUserService, ApiPatientTreatmentStatusDataAccessPublicService],
})
export class ApiPatientTreatmentStatusDataAccessModule {}
