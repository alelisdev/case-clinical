
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureOrTreatmentRequestDataAccessAdminService } from './api-procedure-or-treatment-request-data-access-admin.service'
import { ApiProcedureOrTreatmentRequestDataAccessUserService } from './api-procedure-or-treatment-request-data-access-user.service'
import { ApiProcedureOrTreatmentRequestDataAccessPublicService } from './api-procedure-or-treatment-request-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureOrTreatmentRequestDataAccessAdminService, ApiProcedureOrTreatmentRequestDataAccessUserService, ApiProcedureOrTreatmentRequestDataAccessPublicService],
  exports: [ApiProcedureOrTreatmentRequestDataAccessAdminService, ApiProcedureOrTreatmentRequestDataAccessUserService, ApiProcedureOrTreatmentRequestDataAccessPublicService],
})
export class ApiProcedureOrTreatmentRequestDataAccessModule {}
