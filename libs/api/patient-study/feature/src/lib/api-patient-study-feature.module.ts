
import { Module } from '@nestjs/common'
import { ApiPatientStudyDataAccessModule } from '@case-clinical/api/patient-study/data-access'

import { ApiPatientStudyFeatureAdminResolver } from './api-patient-study-feature-admin.resolver'
import { ApiPatientStudyFeaturePublicResolver } from './api-patient-study-feature-public.resolver'
import { ApiPatientStudyFeatureUserResolver } from './api-patient-study-feature-user.resolver'

@Module({
  imports: [ApiPatientStudyDataAccessModule],
  providers: [
        ApiPatientStudyFeatureAdminResolver,
        ApiPatientStudyFeaturePublicResolver,
        ApiPatientStudyFeatureUserResolver
    ],
})
export class ApiPatientStudyFeatureModule {}
