
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiDiagnosisCodeDataAccessAdminService } from './api-diagnosis-code-data-access-admin.service'
import { ApiDiagnosisCodeDataAccessUserService } from './api-diagnosis-code-data-access-user.service'
import { ApiDiagnosisCodeDataAccessPublicService } from './api-diagnosis-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiDiagnosisCodeDataAccessAdminService, ApiDiagnosisCodeDataAccessUserService, ApiDiagnosisCodeDataAccessPublicService],
  exports: [ApiDiagnosisCodeDataAccessAdminService, ApiDiagnosisCodeDataAccessUserService, ApiDiagnosisCodeDataAccessPublicService],
})
export class ApiDiagnosisCodeDataAccessModule {}
