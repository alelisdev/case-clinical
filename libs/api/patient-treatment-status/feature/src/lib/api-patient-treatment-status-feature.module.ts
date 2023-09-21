
import { Module } from '@nestjs/common'
import { ApiPatientTreatmentStatusDataAccessModule } from '@case-clinical/api/patient-treatment-status/data-access'

import { ApiPatientTreatmentStatusFeatureAdminResolver } from './api-patient-treatment-status-feature-admin.resolver'
import { ApiPatientTreatmentStatusFeaturePublicResolver } from './api-patient-treatment-status-feature-public.resolver'
import { ApiPatientTreatmentStatusFeatureUserResolver } from './api-patient-treatment-status-feature-user.resolver'

@Module({
  imports: [ApiPatientTreatmentStatusDataAccessModule],
  providers: [
        ApiPatientTreatmentStatusFeatureAdminResolver,
        ApiPatientTreatmentStatusFeaturePublicResolver,
        ApiPatientTreatmentStatusFeatureUserResolver
    ],
})
export class ApiPatientTreatmentStatusFeatureModule {}
