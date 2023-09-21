
import { Module } from '@nestjs/common'
import { ApiServiceDataAccessModule } from '@case-clinical/api/service/data-access'

import { ApiServiceFeatureAdminResolver } from './api-service-feature-admin.resolver'
import { ApiServiceFeaturePublicResolver } from './api-service-feature-public.resolver'
import { ApiServiceFeatureUserResolver } from './api-service-feature-user.resolver'

@Module({
  imports: [ApiServiceDataAccessModule],
  providers: [
        ApiServiceFeatureAdminResolver,
        ApiServiceFeaturePublicResolver,
        ApiServiceFeatureUserResolver
    ],
})
export class ApiServiceFeatureModule {}
