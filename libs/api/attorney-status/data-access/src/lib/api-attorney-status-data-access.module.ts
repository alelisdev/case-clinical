
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAttorneyStatusDataAccessAdminService } from './api-attorney-status-data-access-admin.service'
import { ApiAttorneyStatusDataAccessUserService } from './api-attorney-status-data-access-user.service'
import { ApiAttorneyStatusDataAccessPublicService } from './api-attorney-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAttorneyStatusDataAccessAdminService, ApiAttorneyStatusDataAccessUserService, ApiAttorneyStatusDataAccessPublicService],
  exports: [ApiAttorneyStatusDataAccessAdminService, ApiAttorneyStatusDataAccessUserService, ApiAttorneyStatusDataAccessPublicService],
})
export class ApiAttorneyStatusDataAccessModule {}
