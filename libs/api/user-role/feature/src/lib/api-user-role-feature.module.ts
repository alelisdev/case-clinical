
import { Module } from '@nestjs/common'
import { ApiUserRoleDataAccessModule } from '@case-clinical/api/user-role/data-access'

import { ApiUserRoleFeatureAdminResolver } from './api-user-role-feature-admin.resolver'
import { ApiUserRoleFeaturePublicResolver } from './api-user-role-feature-public.resolver'
import { ApiUserRoleFeatureUserResolver } from './api-user-role-feature-user.resolver'

@Module({
  imports: [ApiUserRoleDataAccessModule],
  providers: [
        ApiUserRoleFeatureAdminResolver,
        ApiUserRoleFeaturePublicResolver,
        ApiUserRoleFeatureUserResolver
    ],
})
export class ApiUserRoleFeatureModule {}
