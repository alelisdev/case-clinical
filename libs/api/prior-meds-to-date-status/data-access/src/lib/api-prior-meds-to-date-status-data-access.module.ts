
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorMedsToDateStatusDataAccessAdminService } from './api-prior-meds-to-date-status-data-access-admin.service'
import { ApiPriorMedsToDateStatusDataAccessUserService } from './api-prior-meds-to-date-status-data-access-user.service'
import { ApiPriorMedsToDateStatusDataAccessPublicService } from './api-prior-meds-to-date-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorMedsToDateStatusDataAccessAdminService, ApiPriorMedsToDateStatusDataAccessUserService, ApiPriorMedsToDateStatusDataAccessPublicService],
  exports: [ApiPriorMedsToDateStatusDataAccessAdminService, ApiPriorMedsToDateStatusDataAccessUserService, ApiPriorMedsToDateStatusDataAccessPublicService],
})
export class ApiPriorMedsToDateStatusDataAccessModule {}
