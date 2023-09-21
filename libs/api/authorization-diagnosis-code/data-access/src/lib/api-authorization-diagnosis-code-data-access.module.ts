
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationDiagnosisCodeDataAccessAdminService } from './api-authorization-diagnosis-code-data-access-admin.service'
import { ApiAuthorizationDiagnosisCodeDataAccessUserService } from './api-authorization-diagnosis-code-data-access-user.service'
import { ApiAuthorizationDiagnosisCodeDataAccessPublicService } from './api-authorization-diagnosis-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationDiagnosisCodeDataAccessAdminService, ApiAuthorizationDiagnosisCodeDataAccessUserService, ApiAuthorizationDiagnosisCodeDataAccessPublicService],
  exports: [ApiAuthorizationDiagnosisCodeDataAccessAdminService, ApiAuthorizationDiagnosisCodeDataAccessUserService, ApiAuthorizationDiagnosisCodeDataAccessPublicService],
})
export class ApiAuthorizationDiagnosisCodeDataAccessModule {}
