
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiWriteOffDataAccessAdminService } from './api-write-off-data-access-admin.service'
import { ApiWriteOffDataAccessUserService } from './api-write-off-data-access-user.service'
import { ApiWriteOffDataAccessPublicService } from './api-write-off-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiWriteOffDataAccessAdminService, ApiWriteOffDataAccessUserService, ApiWriteOffDataAccessPublicService],
  exports: [ApiWriteOffDataAccessAdminService, ApiWriteOffDataAccessUserService, ApiWriteOffDataAccessPublicService],
})
export class ApiWriteOffDataAccessModule {}
