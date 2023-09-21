
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiWriteOffStatusDataAccessAdminService } from './api-write-off-status-data-access-admin.service'
import { ApiWriteOffStatusDataAccessUserService } from './api-write-off-status-data-access-user.service'
import { ApiWriteOffStatusDataAccessPublicService } from './api-write-off-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiWriteOffStatusDataAccessAdminService, ApiWriteOffStatusDataAccessUserService, ApiWriteOffStatusDataAccessPublicService],
  exports: [ApiWriteOffStatusDataAccessAdminService, ApiWriteOffStatusDataAccessUserService, ApiWriteOffStatusDataAccessPublicService],
})
export class ApiWriteOffStatusDataAccessModule {}
