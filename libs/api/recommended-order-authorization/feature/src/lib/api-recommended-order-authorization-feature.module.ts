
import { Module } from '@nestjs/common'
import { ApiRecommendedOrderAuthorizationDataAccessModule } from '@case-clinical/api/recommended-order-authorization/data-access'

import { ApiRecommendedOrderAuthorizationFeatureAdminResolver } from './api-recommended-order-authorization-feature-admin.resolver'
import { ApiRecommendedOrderAuthorizationFeaturePublicResolver } from './api-recommended-order-authorization-feature-public.resolver'
import { ApiRecommendedOrderAuthorizationFeatureUserResolver } from './api-recommended-order-authorization-feature-user.resolver'

@Module({
  imports: [ApiRecommendedOrderAuthorizationDataAccessModule],
  providers: [
        ApiRecommendedOrderAuthorizationFeatureAdminResolver,
        ApiRecommendedOrderAuthorizationFeaturePublicResolver,
        ApiRecommendedOrderAuthorizationFeatureUserResolver
    ],
})
export class ApiRecommendedOrderAuthorizationFeatureModule {}
