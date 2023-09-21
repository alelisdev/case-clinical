
import { Module } from '@nestjs/common'
import { ApiCategoryDataAccessModule } from '@case-clinical/api/category/data-access'

import { ApiCategoryFeatureAdminResolver } from './api-category-feature-admin.resolver'
import { ApiCategoryFeaturePublicResolver } from './api-category-feature-public.resolver'
import { ApiCategoryFeatureUserResolver } from './api-category-feature-user.resolver'

@Module({
  imports: [ApiCategoryDataAccessModule],
  providers: [
        ApiCategoryFeatureAdminResolver,
        ApiCategoryFeaturePublicResolver,
        ApiCategoryFeatureUserResolver
    ],
})
export class ApiCategoryFeatureModule {}
