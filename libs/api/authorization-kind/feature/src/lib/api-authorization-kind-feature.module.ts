
import { Module } from '@nestjs/common'
import { ApiAuthorizationKindDataAccessModule } from '@case-clinical/api/authorization-kind/data-access'

import { ApiAuthorizationKindFeatureAdminResolver } from './api-authorization-kind-feature-admin.resolver'
import { ApiAuthorizationKindFeaturePublicResolver } from './api-authorization-kind-feature-public.resolver'
import { ApiAuthorizationKindFeatureUserResolver } from './api-authorization-kind-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationKindDataAccessModule],
  providers: [
        ApiAuthorizationKindFeatureAdminResolver,
        ApiAuthorizationKindFeaturePublicResolver,
        ApiAuthorizationKindFeatureUserResolver
    ],
})
export class ApiAuthorizationKindFeatureModule {}
