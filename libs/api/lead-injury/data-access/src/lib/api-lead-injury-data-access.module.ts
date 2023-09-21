
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadInjuryDataAccessAdminService } from './api-lead-injury-data-access-admin.service'
import { ApiLeadInjuryDataAccessUserService } from './api-lead-injury-data-access-user.service'
import { ApiLeadInjuryDataAccessPublicService } from './api-lead-injury-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLeadInjuryDataAccessAdminService, ApiLeadInjuryDataAccessUserService, ApiLeadInjuryDataAccessPublicService],
  exports: [ApiLeadInjuryDataAccessAdminService, ApiLeadInjuryDataAccessUserService, ApiLeadInjuryDataAccessPublicService],
})
export class ApiLeadInjuryDataAccessModule {}
