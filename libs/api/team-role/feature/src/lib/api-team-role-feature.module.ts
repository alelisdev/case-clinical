
import { Module } from '@nestjs/common'
import { ApiTeamRoleDataAccessModule } from '@case-clinical/api/team-role/data-access'

import { ApiTeamRoleFeatureAdminResolver } from './api-team-role-feature-admin.resolver'
import { ApiTeamRoleFeaturePublicResolver } from './api-team-role-feature-public.resolver'
import { ApiTeamRoleFeatureUserResolver } from './api-team-role-feature-user.resolver'

@Module({
  imports: [ApiTeamRoleDataAccessModule],
  providers: [
        ApiTeamRoleFeatureAdminResolver,
        ApiTeamRoleFeaturePublicResolver,
        ApiTeamRoleFeatureUserResolver
    ],
})
export class ApiTeamRoleFeatureModule {}
