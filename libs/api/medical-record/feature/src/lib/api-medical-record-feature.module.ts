
import { Module } from '@nestjs/common'
import { ApiMedicalRecordDataAccessModule } from '@case-clinical/api/medical-record/data-access'

import { ApiMedicalRecordFeatureAdminResolver } from './api-medical-record-feature-admin.resolver'
import { ApiMedicalRecordFeaturePublicResolver } from './api-medical-record-feature-public.resolver'
import { ApiMedicalRecordFeatureUserResolver } from './api-medical-record-feature-user.resolver'

@Module({
  imports: [ApiMedicalRecordDataAccessModule],
  providers: [
        ApiMedicalRecordFeatureAdminResolver,
        ApiMedicalRecordFeaturePublicResolver,
        ApiMedicalRecordFeatureUserResolver
    ],
})
export class ApiMedicalRecordFeatureModule {}
