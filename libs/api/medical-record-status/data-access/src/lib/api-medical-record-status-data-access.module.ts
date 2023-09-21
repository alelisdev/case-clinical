
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMedicalRecordStatusDataAccessAdminService } from './api-medical-record-status-data-access-admin.service'
import { ApiMedicalRecordStatusDataAccessUserService } from './api-medical-record-status-data-access-user.service'
import { ApiMedicalRecordStatusDataAccessPublicService } from './api-medical-record-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMedicalRecordStatusDataAccessAdminService, ApiMedicalRecordStatusDataAccessUserService, ApiMedicalRecordStatusDataAccessPublicService],
  exports: [ApiMedicalRecordStatusDataAccessAdminService, ApiMedicalRecordStatusDataAccessUserService, ApiMedicalRecordStatusDataAccessPublicService],
})
export class ApiMedicalRecordStatusDataAccessModule {}
