
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAccountStatusDataAccessAdminService } from './api-account-status-data-access-admin.service'
import { ApiAccountStatusDataAccessUserService } from './api-account-status-data-access-user.service'
import { ApiAccountStatusDataAccessPublicService } from './api-account-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAccountStatusDataAccessAdminService, ApiAccountStatusDataAccessUserService, ApiAccountStatusDataAccessPublicService],
  exports: [ApiAccountStatusDataAccessAdminService, ApiAccountStatusDataAccessUserService, ApiAccountStatusDataAccessPublicService],
})
export class ApiAccountStatusDataAccessModule {}
