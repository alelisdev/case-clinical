
import { Module } from '@nestjs/common'
import { ApiUserFeaturePermissionDataAccessModule } from '@case-clinical/api/user-feature-permission/data-access'

import { ApiUserFeaturePermissionFeatureAdminResolver } from './api-user-feature-permission-feature-admin.resolver'
import { ApiUserFeaturePermissionFeaturePublicResolver } from './api-user-feature-permission-feature-public.resolver'
import { ApiUserFeaturePermissionFeatureUserResolver } from './api-user-feature-permission-feature-user.resolver'

@Module({
  imports: [ApiUserFeaturePermissionDataAccessModule],
  providers: [
        ApiUserFeaturePermissionFeatureAdminResolver,
        ApiUserFeaturePermissionFeaturePublicResolver,
        ApiUserFeaturePermissionFeatureUserResolver
    ],
})
export class ApiUserFeaturePermissionFeatureModule {}
