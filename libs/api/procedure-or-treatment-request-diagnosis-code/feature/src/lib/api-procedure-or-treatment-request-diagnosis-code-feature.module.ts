
import { Module } from '@nestjs/common'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessModule } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'

import { ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureAdminResolver } from './api-procedure-or-treatment-request-diagnosis-code-feature-admin.resolver'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeFeaturePublicResolver } from './api-procedure-or-treatment-request-diagnosis-code-feature-public.resolver'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureUserResolver } from './api-procedure-or-treatment-request-diagnosis-code-feature-user.resolver'

@Module({
  imports: [ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessModule],
  providers: [
        ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureAdminResolver,
        ApiProcedureOrTreatmentRequestDiagnosisCodeFeaturePublicResolver,
        ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureUserResolver
    ],
})
export class ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureModule {}
