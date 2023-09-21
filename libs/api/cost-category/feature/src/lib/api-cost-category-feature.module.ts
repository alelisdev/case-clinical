
import { Module } from '@nestjs/common'
import { ApiCostCategoryDataAccessModule } from '@case-clinical/api/cost-category/data-access'

import { ApiCostCategoryFeatureAdminResolver } from './api-cost-category-feature-admin.resolver'
import { ApiCostCategoryFeaturePublicResolver } from './api-cost-category-feature-public.resolver'
import { ApiCostCategoryFeatureUserResolver } from './api-cost-category-feature-user.resolver'

@Module({
  imports: [ApiCostCategoryDataAccessModule],
  providers: [
        ApiCostCategoryFeatureAdminResolver,
        ApiCostCategoryFeaturePublicResolver,
        ApiCostCategoryFeatureUserResolver
    ],
})
export class ApiCostCategoryFeatureModule {}
