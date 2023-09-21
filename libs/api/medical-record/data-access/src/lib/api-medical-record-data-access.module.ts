
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMedicalRecordDataAccessAdminService } from './api-medical-record-data-access-admin.service'
import { ApiMedicalRecordDataAccessUserService } from './api-medical-record-data-access-user.service'
import { ApiMedicalRecordDataAccessPublicService } from './api-medical-record-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMedicalRecordDataAccessAdminService, ApiMedicalRecordDataAccessUserService, ApiMedicalRecordDataAccessPublicService],
  exports: [ApiMedicalRecordDataAccessAdminService, ApiMedicalRecordDataAccessUserService, ApiMedicalRecordDataAccessPublicService],
})
export class ApiMedicalRecordDataAccessModule {}
