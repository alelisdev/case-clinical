
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRolePermissionDataAccessAdminService } from './api-role-permission-data-access-admin.service'
import { ApiRolePermissionDataAccessUserService } from './api-role-permission-data-access-user.service'
import { ApiRolePermissionDataAccessPublicService } from './api-role-permission-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRolePermissionDataAccessAdminService, ApiRolePermissionDataAccessUserService, ApiRolePermissionDataAccessPublicService],
  exports: [ApiRolePermissionDataAccessAdminService, ApiRolePermissionDataAccessUserService, ApiRolePermissionDataAccessPublicService],
})
export class ApiRolePermissionDataAccessModule {}
