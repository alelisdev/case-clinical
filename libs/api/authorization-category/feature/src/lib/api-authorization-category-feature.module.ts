
import { Module } from '@nestjs/common'
import { ApiAuthorizationCategoryDataAccessModule } from '@case-clinical/api/authorization-category/data-access'

import { ApiAuthorizationCategoryFeatureAdminResolver } from './api-authorization-category-feature-admin.resolver'
import { ApiAuthorizationCategoryFeaturePublicResolver } from './api-authorization-category-feature-public.resolver'
import { ApiAuthorizationCategoryFeatureUserResolver } from './api-authorization-category-feature-user.resolver'

@Module({
  imports: [ApiAuthorizationCategoryDataAccessModule],
  providers: [
        ApiAuthorizationCategoryFeatureAdminResolver,
        ApiAuthorizationCategoryFeaturePublicResolver,
        ApiAuthorizationCategoryFeatureUserResolver
    ],
})
export class ApiAuthorizationCategoryFeatureModule {}
