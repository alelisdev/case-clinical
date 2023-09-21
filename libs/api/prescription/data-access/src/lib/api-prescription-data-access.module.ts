
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPrescriptionDataAccessAdminService } from './api-prescription-data-access-admin.service'
import { ApiPrescriptionDataAccessUserService } from './api-prescription-data-access-user.service'
import { ApiPrescriptionDataAccessPublicService } from './api-prescription-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPrescriptionDataAccessAdminService, ApiPrescriptionDataAccessUserService, ApiPrescriptionDataAccessPublicService],
  exports: [ApiPrescriptionDataAccessAdminService, ApiPrescriptionDataAccessUserService, ApiPrescriptionDataAccessPublicService],
})
export class ApiPrescriptionDataAccessModule {}
