
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPatientDataAccessAdminService } from './api-patient-data-access-admin.service'
import { ApiPatientDataAccessUserService } from './api-patient-data-access-user.service'
import { ApiPatientDataAccessPublicService } from './api-patient-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPatientDataAccessAdminService, ApiPatientDataAccessUserService, ApiPatientDataAccessPublicService],
  exports: [ApiPatientDataAccessAdminService, ApiPatientDataAccessUserService, ApiPatientDataAccessPublicService],
})
export class ApiPatientDataAccessModule {}
