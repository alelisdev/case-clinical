
import { Module } from '@nestjs/common'
import { ApiAwardDataAccessModule } from '@case-clinical/api/award/data-access'

import { ApiAwardFeatureAdminResolver } from './api-award-feature-admin.resolver'
import { ApiAwardFeaturePublicResolver } from './api-award-feature-public.resolver'
import { ApiAwardFeatureUserResolver } from './api-award-feature-user.resolver'

@Module({
  imports: [ApiAwardDataAccessModule],
  providers: [
        ApiAwardFeatureAdminResolver,
        ApiAwardFeaturePublicResolver,
        ApiAwardFeatureUserResolver
    ],
})
export class ApiAwardFeatureModule {}
