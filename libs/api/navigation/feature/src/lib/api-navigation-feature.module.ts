
import { Module } from '@nestjs/common'
import { ApiNavigationDataAccessModule } from '@case-clinical/api/navigation/data-access'

import { ApiNavigationFeatureAdminResolver } from './api-navigation-feature-admin.resolver'
import { ApiNavigationFeaturePublicResolver } from './api-navigation-feature-public.resolver'
import { ApiNavigationFeatureUserResolver } from './api-navigation-feature-user.resolver'

@Module({
  imports: [ApiNavigationDataAccessModule],
  providers: [
        ApiNavigationFeatureAdminResolver,
        ApiNavigationFeaturePublicResolver,
        ApiNavigationFeatureUserResolver
    ],
})
export class ApiNavigationFeatureModule {}
