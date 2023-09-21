
import { Module } from '@nestjs/common'
import { ApiFeaturePermissionDataAccessModule } from '@case-clinical/api/feature-permission/data-access'

import { ApiFeaturePermissionFeatureAdminResolver } from './api-feature-permission-feature-admin.resolver'
import { ApiFeaturePermissionFeaturePublicResolver } from './api-feature-permission-feature-public.resolver'
import { ApiFeaturePermissionFeatureUserResolver } from './api-feature-permission-feature-user.resolver'

@Module({
  imports: [ApiFeaturePermissionDataAccessModule],
  providers: [
        ApiFeaturePermissionFeatureAdminResolver,
        ApiFeaturePermissionFeaturePublicResolver,
        ApiFeaturePermissionFeatureUserResolver
    ],
})
export class ApiFeaturePermissionFeatureModule {}
