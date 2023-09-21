
import { Module } from '@nestjs/common'
import { ApiMedicalRecordStatusDataAccessModule } from '@case-clinical/api/medical-record-status/data-access'

import { ApiMedicalRecordStatusFeatureAdminResolver } from './api-medical-record-status-feature-admin.resolver'
import { ApiMedicalRecordStatusFeaturePublicResolver } from './api-medical-record-status-feature-public.resolver'
import { ApiMedicalRecordStatusFeatureUserResolver } from './api-medical-record-status-feature-user.resolver'

@Module({
  imports: [ApiMedicalRecordStatusDataAccessModule],
  providers: [
        ApiMedicalRecordStatusFeatureAdminResolver,
        ApiMedicalRecordStatusFeaturePublicResolver,
        ApiMedicalRecordStatusFeatureUserResolver
    ],
})
export class ApiMedicalRecordStatusFeatureModule {}
