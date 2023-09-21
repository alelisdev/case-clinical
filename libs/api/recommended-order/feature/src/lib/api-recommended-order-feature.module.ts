
import { Module } from '@nestjs/common'
import { ApiRecommendedOrderDataAccessModule } from '@case-clinical/api/recommended-order/data-access'

import { ApiRecommendedOrderFeatureAdminResolver } from './api-recommended-order-feature-admin.resolver'
import { ApiRecommendedOrderFeaturePublicResolver } from './api-recommended-order-feature-public.resolver'
import { ApiRecommendedOrderFeatureUserResolver } from './api-recommended-order-feature-user.resolver'

@Module({
  imports: [ApiRecommendedOrderDataAccessModule],
  providers: [
        ApiRecommendedOrderFeatureAdminResolver,
        ApiRecommendedOrderFeaturePublicResolver,
        ApiRecommendedOrderFeatureUserResolver
    ],
})
export class ApiRecommendedOrderFeatureModule {}
