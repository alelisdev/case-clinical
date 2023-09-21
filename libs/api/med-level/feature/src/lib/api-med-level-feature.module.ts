
import { Module } from '@nestjs/common'
import { ApiMedLevelDataAccessModule } from '@case-clinical/api/med-level/data-access'

import { ApiMedLevelFeatureAdminResolver } from './api-med-level-feature-admin.resolver'
import { ApiMedLevelFeaturePublicResolver } from './api-med-level-feature-public.resolver'
import { ApiMedLevelFeatureUserResolver } from './api-med-level-feature-user.resolver'

@Module({
  imports: [ApiMedLevelDataAccessModule],
  providers: [
        ApiMedLevelFeatureAdminResolver,
        ApiMedLevelFeaturePublicResolver,
        ApiMedLevelFeatureUserResolver
    ],
})
export class ApiMedLevelFeatureModule {}
