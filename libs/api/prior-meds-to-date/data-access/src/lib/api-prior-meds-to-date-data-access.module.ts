
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorMedsToDateDataAccessAdminService } from './api-prior-meds-to-date-data-access-admin.service'
import { ApiPriorMedsToDateDataAccessUserService } from './api-prior-meds-to-date-data-access-user.service'
import { ApiPriorMedsToDateDataAccessPublicService } from './api-prior-meds-to-date-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorMedsToDateDataAccessAdminService, ApiPriorMedsToDateDataAccessUserService, ApiPriorMedsToDateDataAccessPublicService],
  exports: [ApiPriorMedsToDateDataAccessAdminService, ApiPriorMedsToDateDataAccessUserService, ApiPriorMedsToDateDataAccessPublicService],
})
export class ApiPriorMedsToDateDataAccessModule {}
