
import { Module } from '@nestjs/common'
import { ApiPriorAuthorizationImplantDataAccessModule } from '@case-clinical/api/prior-authorization-implant/data-access'

import { ApiPriorAuthorizationImplantFeatureAdminResolver } from './api-prior-authorization-implant-feature-admin.resolver'
import { ApiPriorAuthorizationImplantFeaturePublicResolver } from './api-prior-authorization-implant-feature-public.resolver'
import { ApiPriorAuthorizationImplantFeatureUserResolver } from './api-prior-authorization-implant-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthorizationImplantDataAccessModule],
  providers: [
        ApiPriorAuthorizationImplantFeatureAdminResolver,
        ApiPriorAuthorizationImplantFeaturePublicResolver,
        ApiPriorAuthorizationImplantFeatureUserResolver
    ],
})
export class ApiPriorAuthorizationImplantFeatureModule {}
