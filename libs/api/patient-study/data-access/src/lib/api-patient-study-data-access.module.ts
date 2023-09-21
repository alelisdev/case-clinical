
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPatientStudyDataAccessAdminService } from './api-patient-study-data-access-admin.service'
import { ApiPatientStudyDataAccessUserService } from './api-patient-study-data-access-user.service'
import { ApiPatientStudyDataAccessPublicService } from './api-patient-study-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPatientStudyDataAccessAdminService, ApiPatientStudyDataAccessUserService, ApiPatientStudyDataAccessPublicService],
  exports: [ApiPatientStudyDataAccessAdminService, ApiPatientStudyDataAccessUserService, ApiPatientStudyDataAccessPublicService],
})
export class ApiPatientStudyDataAccessModule {}
