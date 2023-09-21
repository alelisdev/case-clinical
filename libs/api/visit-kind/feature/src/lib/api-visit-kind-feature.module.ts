
import { Module } from '@nestjs/common'
import { ApiVisitKindDataAccessModule } from '@case-clinical/api/visit-kind/data-access'

import { ApiVisitKindFeatureAdminResolver } from './api-visit-kind-feature-admin.resolver'
import { ApiVisitKindFeaturePublicResolver } from './api-visit-kind-feature-public.resolver'
import { ApiVisitKindFeatureUserResolver } from './api-visit-kind-feature-user.resolver'

@Module({
  imports: [ApiVisitKindDataAccessModule],
  providers: [
        ApiVisitKindFeatureAdminResolver,
        ApiVisitKindFeaturePublicResolver,
        ApiVisitKindFeatureUserResolver
    ],
})
export class ApiVisitKindFeatureModule {}
