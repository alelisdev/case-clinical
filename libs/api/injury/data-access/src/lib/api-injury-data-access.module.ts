
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInjuryDataAccessAdminService } from './api-injury-data-access-admin.service'
import { ApiInjuryDataAccessUserService } from './api-injury-data-access-user.service'
import { ApiInjuryDataAccessPublicService } from './api-injury-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInjuryDataAccessAdminService, ApiInjuryDataAccessUserService, ApiInjuryDataAccessPublicService],
  exports: [ApiInjuryDataAccessAdminService, ApiInjuryDataAccessUserService, ApiInjuryDataAccessPublicService],
})
export class ApiInjuryDataAccessModule {}
