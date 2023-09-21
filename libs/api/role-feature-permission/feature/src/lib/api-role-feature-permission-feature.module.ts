
import { Module } from '@nestjs/common'
import { ApiRoleFeaturePermissionDataAccessModule } from '@case-clinical/api/role-feature-permission/data-access'

import { ApiRoleFeaturePermissionFeatureAdminResolver } from './api-role-feature-permission-feature-admin.resolver'
import { ApiRoleFeaturePermissionFeaturePublicResolver } from './api-role-feature-permission-feature-public.resolver'
import { ApiRoleFeaturePermissionFeatureUserResolver } from './api-role-feature-permission-feature-user.resolver'

@Module({
  imports: [ApiRoleFeaturePermissionDataAccessModule],
  providers: [
        ApiRoleFeaturePermissionFeatureAdminResolver,
        ApiRoleFeaturePermissionFeaturePublicResolver,
        ApiRoleFeaturePermissionFeatureUserResolver
    ],
})
export class ApiRoleFeaturePermissionFeatureModule {}
