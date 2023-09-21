
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPermissionDataAccessAdminService } from './api-permission-data-access-admin.service'
import { ApiPermissionDataAccessUserService } from './api-permission-data-access-user.service'
import { ApiPermissionDataAccessPublicService } from './api-permission-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPermissionDataAccessAdminService, ApiPermissionDataAccessUserService, ApiPermissionDataAccessPublicService],
  exports: [ApiPermissionDataAccessAdminService, ApiPermissionDataAccessUserService, ApiPermissionDataAccessPublicService],
})
export class ApiPermissionDataAccessModule {}
