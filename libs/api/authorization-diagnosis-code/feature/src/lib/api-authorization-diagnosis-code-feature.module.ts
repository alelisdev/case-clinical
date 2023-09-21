
import { Module } from '@nestjs/common'
import { ApiAuthorizationDiagnosisCodeDataAccessModule } from '@case-clinical/api/authorization-diagnosis-code/data-access'

import { ApiAuthorizationDiagnosisCodeFeatureAdminResolver } from './api-authorization-diagnosis-code-feature-admin.resolver'
import { ApiAuthorizationDiagnosisCodeFeaturePublicResolver } from './api-authorization-diagnosis-code-feature-public.resolver'
import { ApiAuthorizationDiagnosisCodeFeatureUserResolver } from './api-authorization-diagnosis-code-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationDiagnosisCodeDataAccessModule],
  providers: [
        ApiAuthorizationDiagnosisCodeFeatureAdminResolver,
        ApiAuthorizationDiagnosisCodeFeaturePublicResolver,
        ApiAuthorizationDiagnosisCodeFeatureUserResolver
    ],
})
export class ApiAuthorizationDiagnosisCodeFeatureModule {}
