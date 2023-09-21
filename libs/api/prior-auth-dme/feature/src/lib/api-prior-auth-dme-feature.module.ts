
import { Module } from '@nestjs/common'
import { ApiPriorAuthDmeDataAccessModule } from '@case-clinical/api/prior-auth-dme/data-access'

import { ApiPriorAuthDmeFeatureAdminResolver } from './api-prior-auth-dme-feature-admin.resolver'
import { ApiPriorAuthDmeFeaturePublicResolver } from './api-prior-auth-dme-feature-public.resolver'
import { ApiPriorAuthDmeFeatureUserResolver } from './api-prior-auth-dme-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthDmeDataAccessModule],
  providers: [
        ApiPriorAuthDmeFeatureAdminResolver,
        ApiPriorAuthDmeFeaturePublicResolver,
        ApiPriorAuthDmeFeatureUserResolver
    ],
})
export class ApiPriorAuthDmeFeatureModule {}
