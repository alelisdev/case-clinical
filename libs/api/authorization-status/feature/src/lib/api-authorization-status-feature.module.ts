
import { Module } from '@nestjs/common'
import { ApiAuthorizationStatusDataAccessModule } from '@case-clinical/api/authorization-status/data-access'

import { ApiAuthorizationStatusFeatureAdminResolver } from './api-authorization-status-feature-admin.resolver'
import { ApiAuthorizationStatusFeaturePublicResolver } from './api-authorization-status-feature-public.resolver'
import { ApiAuthorizationStatusFeatureUserResolver } from './api-authorization-status-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationStatusDataAccessModule],
  providers: [
        ApiAuthorizationStatusFeatureAdminResolver,
        ApiAuthorizationStatusFeaturePublicResolver,
        ApiAuthorizationStatusFeatureUserResolver
    ],
})
export class ApiAuthorizationStatusFeatureModule {}
