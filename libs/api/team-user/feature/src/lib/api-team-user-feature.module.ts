
import { Module } from '@nestjs/common'
import { ApiTeamUserDataAccessModule } from '@case-clinical/api/team-user/data-access'

import { ApiTeamUserFeatureAdminResolver } from './api-team-user-feature-admin.resolver'
import { ApiTeamUserFeaturePublicResolver } from './api-team-user-feature-public.resolver'
import { ApiTeamUserFeatureUserResolver } from './api-team-user-feature-user.resolver'

@Module({
  imports: [ApiTeamUserDataAccessModule],
  providers: [
        ApiTeamUserFeatureAdminResolver,
        ApiTeamUserFeaturePublicResolver,
        ApiTeamUserFeatureUserResolver
    ],
})
export class ApiTeamUserFeatureModule {}
