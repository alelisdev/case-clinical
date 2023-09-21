
import { Module } from '@nestjs/common'
import { ApiDiagnosisCodeDataAccessModule } from '@case-clinical/api/diagnosis-code/data-access'

import { ApiDiagnosisCodeFeatureAdminResolver } from './api-diagnosis-code-feature-admin.resolver'
import { ApiDiagnosisCodeFeaturePublicResolver } from './api-diagnosis-code-feature-public.resolver'
import { ApiDiagnosisCodeFeatureUserResolver } from './api-diagnosis-code-feature-user.resolver'

@Module({
  imports: [ApiDiagnosisCodeDataAccessModule],
  providers: [
        ApiDiagnosisCodeFeatureAdminResolver,
        ApiDiagnosisCodeFeaturePublicResolver,
        ApiDiagnosisCodeFeatureUserResolver
    ],
})
export class ApiDiagnosisCodeFeatureModule {}
