
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService } from './api-prior-authorization-diagnosis-code-data-access-admin.service'
import { ApiPriorAuthorizationDiagnosisCodeDataAccessUserService } from './api-prior-authorization-diagnosis-code-data-access-user.service'
import { ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService } from './api-prior-authorization-diagnosis-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService, ApiPriorAuthorizationDiagnosisCodeDataAccessUserService, ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService],
  exports: [ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService, ApiPriorAuthorizationDiagnosisCodeDataAccessUserService, ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService],
})
export class ApiPriorAuthorizationDiagnosisCodeDataAccessModule {}
