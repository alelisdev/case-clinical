
import { Module } from '@nestjs/common'
import { ApiPermissionDataAccessModule } from '@case-clinical/api/permission/data-access'

import { ApiPermissionFeatureAdminResolver } from './api-permission-feature-admin.resolver'
import { ApiPermissionFeaturePublicResolver } from './api-permission-feature-public.resolver'
import { ApiPermissionFeatureUserResolver } from './api-permission-feature-user.resolver'

@Module({
  imports: [ApiPermissionDataAccessModule],
  providers: [
        ApiPermissionFeatureAdminResolver,
        ApiPermissionFeaturePublicResolver,
        ApiPermissionFeatureUserResolver
    ],
})
export class ApiPermissionFeatureModule {}
