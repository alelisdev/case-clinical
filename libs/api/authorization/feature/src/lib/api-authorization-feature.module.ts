
import { Module } from '@nestjs/common'
import { ApiAuthorizationDataAccessModule } from '@case-clinical/api/authorization/data-access'

import { ApiAuthorizationFeatureAdminResolver } from './api-authorization-feature-admin.resolver'
import { ApiAuthorizationFeaturePublicResolver } from './api-authorization-feature-public.resolver'
import { ApiAuthorizationFeatureUserResolver } from './api-authorization-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationDataAccessModule],
  providers: [
        ApiAuthorizationFeatureAdminResolver,
        ApiAuthorizationFeaturePublicResolver,
        ApiAuthorizationFeatureUserResolver
    ],
})
export class ApiAuthorizationFeatureModule {}
