
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAttorneyDataAccessAdminService } from './api-attorney-data-access-admin.service'
import { ApiAttorneyDataAccessUserService } from './api-attorney-data-access-user.service'
import { ApiAttorneyDataAccessPublicService } from './api-attorney-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAttorneyDataAccessAdminService, ApiAttorneyDataAccessUserService, ApiAttorneyDataAccessPublicService],
  exports: [ApiAttorneyDataAccessAdminService, ApiAttorneyDataAccessUserService, ApiAttorneyDataAccessPublicService],
})
export class ApiAttorneyDataAccessModule {}
