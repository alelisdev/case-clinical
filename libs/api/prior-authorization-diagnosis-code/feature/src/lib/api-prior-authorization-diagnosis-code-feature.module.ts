
import { Module } from '@nestjs/common'
import { ApiPriorAuthorizationDiagnosisCodeDataAccessModule } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access'

import { ApiPriorAuthorizationDiagnosisCodeFeatureAdminResolver } from './api-prior-authorization-diagnosis-code-feature-admin.resolver'
import { ApiPriorAuthorizationDiagnosisCodeFeaturePublicResolver } from './api-prior-authorization-diagnosis-code-feature-public.resolver'
import { ApiPriorAuthorizationDiagnosisCodeFeatureUserResolver } from './api-prior-authorization-diagnosis-code-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthorizationDiagnosisCodeDataAccessModule],
  providers: [
        ApiPriorAuthorizationDiagnosisCodeFeatureAdminResolver,
        ApiPriorAuthorizationDiagnosisCodeFeaturePublicResolver,
        ApiPriorAuthorizationDiagnosisCodeFeatureUserResolver
    ],
})
export class ApiPriorAuthorizationDiagnosisCodeFeatureModule {}
