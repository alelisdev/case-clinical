
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMedLevelDataAccessAdminService } from './api-med-level-data-access-admin.service'
import { ApiMedLevelDataAccessUserService } from './api-med-level-data-access-user.service'
import { ApiMedLevelDataAccessPublicService } from './api-med-level-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMedLevelDataAccessAdminService, ApiMedLevelDataAccessUserService, ApiMedLevelDataAccessPublicService],
  exports: [ApiMedLevelDataAccessAdminService, ApiMedLevelDataAccessUserService, ApiMedLevelDataAccessPublicService],
})
export class ApiMedLevelDataAccessModule {}
