
import { Module } from '@nestjs/common'
import { ApiProcedureOrTreatmentRequestDataAccessModule } from '@case-clinical/api/procedure-or-treatment-request/data-access'

import { ApiProcedureOrTreatmentRequestFeatureAdminResolver } from './api-procedure-or-treatment-request-feature-admin.resolver'
import { ApiProcedureOrTreatmentRequestFeaturePublicResolver } from './api-procedure-or-treatment-request-feature-public.resolver'
import { ApiProcedureOrTreatmentRequestFeatureUserResolver } from './api-procedure-or-treatment-request-feature-user.resolver'

@Module({
  imports: [ApiProcedureOrTreatmentRequestDataAccessModule],
  providers: [
        ApiProcedureOrTreatmentRequestFeatureAdminResolver,
        ApiProcedureOrTreatmentRequestFeaturePublicResolver,
        ApiProcedureOrTreatmentRequestFeatureUserResolver
    ],
})
export class ApiProcedureOrTreatmentRequestFeatureModule {}
