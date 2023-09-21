
import { Module } from '@nestjs/common'
import { ApiTagDataAccessModule } from '@case-clinical/api/tag/data-access'

import { ApiTagFeatureAdminResolver } from './api-tag-feature-admin.resolver'
import { ApiTagFeaturePublicResolver } from './api-tag-feature-public.resolver'
import { ApiTagFeatureUserResolver } from './api-tag-feature-user.resolver'

@Module({
  imports: [ApiTagDataAccessModule],
  providers: [
        ApiTagFeatureAdminResolver,
        ApiTagFeaturePublicResolver,
        ApiTagFeatureUserResolver
    ],
})
export class ApiTagFeatureModule {}
