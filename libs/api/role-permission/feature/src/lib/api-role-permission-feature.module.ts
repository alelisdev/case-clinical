
import { Module } from '@nestjs/common'
import { ApiRolePermissionDataAccessModule } from '@case-clinical/api/role-permission/data-access'

import { ApiRolePermissionFeatureAdminResolver } from './api-role-permission-feature-admin.resolver'
import { ApiRolePermissionFeaturePublicResolver } from './api-role-permission-feature-public.resolver'
import { ApiRolePermissionFeatureUserResolver } from './api-role-permission-feature-user.resolver'

@Module({
  imports: [ApiRolePermissionDataAccessModule],
  providers: [
        ApiRolePermissionFeatureAdminResolver,
        ApiRolePermissionFeaturePublicResolver,
        ApiRolePermissionFeatureUserResolver
    ],
})
export class ApiRolePermissionFeatureModule {}
