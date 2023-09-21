
import { Module } from '@nestjs/common'
import { ApiPriorAuthorizationRequestDataAccessModule } from '@case-clinical/api/prior-authorization-request/data-access'

import { ApiPriorAuthorizationRequestFeatureAdminResolver } from './api-prior-authorization-request-feature-admin.resolver'
import { ApiPriorAuthorizationRequestFeaturePublicResolver } from './api-prior-authorization-request-feature-public.resolver'
import { ApiPriorAuthorizationRequestFeatureUserResolver } from './api-prior-authorization-request-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthorizationRequestDataAccessModule],
  providers: [
        ApiPriorAuthorizationRequestFeatureAdminResolver,
        ApiPriorAuthorizationRequestFeaturePublicResolver,
        ApiPriorAuthorizationRequestFeatureUserResolver
    ],
})
export class ApiPriorAuthorizationRequestFeatureModule {}
