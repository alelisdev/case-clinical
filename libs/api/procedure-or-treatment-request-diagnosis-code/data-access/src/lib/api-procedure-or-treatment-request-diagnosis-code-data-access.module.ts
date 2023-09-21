
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService } from './api-procedure-or-treatment-request-diagnosis-code-data-access-admin.service'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService } from './api-procedure-or-treatment-request-diagnosis-code-data-access-user.service'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService } from './api-procedure-or-treatment-request-diagnosis-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService, ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService, ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService],
  exports: [ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService, ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService, ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService],
})
export class ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessModule {}
