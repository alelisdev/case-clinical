
import { Module } from '@nestjs/common'
import { ApiImplantCategoryDataAccessModule } from '@case-clinical/api/implant-category/data-access'

import { ApiImplantCategoryFeatureAdminResolver } from './api-implant-category-feature-admin.resolver'
import { ApiImplantCategoryFeaturePublicResolver } from './api-implant-category-feature-public.resolver'
import { ApiImplantCategoryFeatureUserResolver } from './api-implant-category-feature-user.resolver'

@Module({
  imports: [ApiImplantCategoryDataAccessModule],
  providers: [
        ApiImplantCategoryFeatureAdminResolver,
        ApiImplantCategoryFeaturePublicResolver,
        ApiImplantCategoryFeatureUserResolver
    ],
})
export class ApiImplantCategoryFeatureModule {}
