
import { Module } from '@nestjs/common'
import { ApiPatientDataAccessModule } from '@case-clinical/api/patient/data-access'

import { ApiPatientFeatureAdminResolver } from './api-patient-feature-admin.resolver'
import { ApiPatientFeaturePublicResolver } from './api-patient-feature-public.resolver'
import { ApiPatientFeatureUserResolver } from './api-patient-feature-user.resolver'

@Module({
  imports: [ApiPatientDataAccessModule],
  providers: [
        ApiPatientFeatureAdminResolver,
        ApiPatientFeaturePublicResolver,
        ApiPatientFeatureUserResolver
    ],
})
export class ApiPatientFeatureModule {}
