
import { Module } from '@nestjs/common'
import { ApiTeamDataAccessModule } from '@case-clinical/api/team/data-access'

import { ApiTeamFeatureAdminResolver } from './api-team-feature-admin.resolver'
import { ApiTeamFeaturePublicResolver } from './api-team-feature-public.resolver'
import { ApiTeamFeatureUserResolver } from './api-team-feature-user.resolver'

@Module({
  imports: [ApiTeamDataAccessModule],
  providers: [
        ApiTeamFeatureAdminResolver,
        ApiTeamFeaturePublicResolver,
        ApiTeamFeatureUserResolver
    ],
})
export class ApiTeamFeatureModule {}
