
import { Module } from '@nestjs/common'
import { ApiRoleFeatureDataAccessModule } from '@case-clinical/api/role-feature/data-access'
import { ApiRoleFeatureFeatureAdminResolver } from './api-role-feature-feature-admin.resolver'
import { ApiRoleFeatureFeaturePublicResolver } from './api-role-feature-feature-public.resolver'

@Module({
  imports: [ApiRoleFeatureDataAccessModule],
  providers: [
        ApiRoleFeatureFeatureAdminResolver,
        ApiRoleFeatureFeaturePublicResolver,
    ],
})
export class ApiRoleFeatureFeatureModule {}
