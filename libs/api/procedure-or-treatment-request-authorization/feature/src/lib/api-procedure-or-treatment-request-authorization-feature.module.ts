
import { Module } from '@nestjs/common'
import { ApiProcedureOrTreatmentRequestAuthorizationDataAccessModule } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'

import { ApiProcedureOrTreatmentRequestAuthorizationFeatureAdminResolver } from './api-procedure-or-treatment-request-authorization-feature-admin.resolver'
import { ApiProcedureOrTreatmentRequestAuthorizationFeaturePublicResolver } from './api-procedure-or-treatment-request-authorization-feature-public.resolver'
import { ApiProcedureOrTreatmentRequestAuthorizationFeatureUserResolver } from './api-procedure-or-treatment-request-authorization-feature-user.resolver'

@Module({
  imports: [ApiProcedureOrTreatmentRequestAuthorizationDataAccessModule],
  providers: [
        ApiProcedureOrTreatmentRequestAuthorizationFeatureAdminResolver,
        ApiProcedureOrTreatmentRequestAuthorizationFeaturePublicResolver,
        ApiProcedureOrTreatmentRequestAuthorizationFeatureUserResolver
    ],
})
export class ApiProcedureOrTreatmentRequestAuthorizationFeatureModule {}
