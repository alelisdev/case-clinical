
import { Module } from '@nestjs/common'
import { ApiRoleDataAccessModule } from '@case-clinical/api/role/data-access'

import { ApiRoleFeatureAdminResolver } from './api-role-feature-admin.resolver'
import { ApiRoleFeaturePublicResolver } from './api-role-feature-public.resolver'
import { ApiRoleFeatureUserResolver } from './api-role-feature-user.resolver'

@Module({
  imports: [ApiRoleDataAccessModule],
  providers: [
        ApiRoleFeatureAdminResolver,
        ApiRoleFeaturePublicResolver,
        ApiRoleFeatureUserResolver
    ],
})
export class ApiRoleFeatureModule {}
