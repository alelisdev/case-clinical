
import { Module } from '@nestjs/common'
import { ApiAcademyCategoryDataAccessModule } from '@case-clinical/api/academy/category/data-access'
import { ApiAcademyCategoryFeatureAdminResolver } from './api-academy-category-feature-admin.resolver'
import { ApiAcademyCategoryFeaturePublicResolver } from './api-academy-category-feature-public.resolver'
import { ApiAcademyCategoryFeatureUserResolver } from './api-academy-category-feature-user.resolver'

@Module({
  imports: [ApiAcademyCategoryDataAccessModule],
  providers: [
        ApiAcademyCategoryFeatureAdminResolver,
        ApiAcademyCategoryFeaturePublicResolver,
        ApiAcademyCategoryFeatureUserResolver
    ],
})
export class ApiAcademyCategoryFeatureModule {}
