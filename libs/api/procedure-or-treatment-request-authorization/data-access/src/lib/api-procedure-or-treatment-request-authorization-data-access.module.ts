
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService } from './api-procedure-or-treatment-request-authorization-data-access-admin.service'
import { ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService } from './api-procedure-or-treatment-request-authorization-data-access-user.service'
import { ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService } from './api-procedure-or-treatment-request-authorization-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService, ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService, ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService],
  exports: [ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService, ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService, ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService],
})
export class ApiProcedureOrTreatmentRequestAuthorizationDataAccessModule {}
