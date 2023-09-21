
import { Module } from '@nestjs/common'
import { ApiAuthorizationTypeDataAccessModule } from '@case-clinical/api/authorization-type/data-access'

import { ApiAuthorizationTypeFeatureAdminResolver } from './api-authorization-type-feature-admin.resolver'
import { ApiAuthorizationTypeFeaturePublicResolver } from './api-authorization-type-feature-public.resolver'
import { ApiAuthorizationTypeFeatureUserResolver } from './api-authorization-type-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationTypeDataAccessModule],
  providers: [
        ApiAuthorizationTypeFeatureAdminResolver,
        ApiAuthorizationTypeFeaturePublicResolver,
        ApiAuthorizationTypeFeatureUserResolver
    ],
})
export class ApiAuthorizationTypeFeatureModule {}
