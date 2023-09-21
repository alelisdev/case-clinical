
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRoleFeaturePermissionDataAccessAdminService } from './api-role-feature-permission-data-access-admin.service'
import { ApiRoleFeaturePermissionDataAccessUserService } from './api-role-feature-permission-data-access-user.service'
import { ApiRoleFeaturePermissionDataAccessPublicService } from './api-role-feature-permission-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRoleFeaturePermissionDataAccessAdminService, ApiRoleFeaturePermissionDataAccessUserService, ApiRoleFeaturePermissionDataAccessPublicService],
  exports: [ApiRoleFeaturePermissionDataAccessAdminService, ApiRoleFeaturePermissionDataAccessUserService, ApiRoleFeaturePermissionDataAccessPublicService],
})
export class ApiRoleFeaturePermissionDataAccessModule {}
