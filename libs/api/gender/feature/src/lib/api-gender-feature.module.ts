
import { Module } from '@nestjs/common'
import { ApiGenderDataAccessModule } from '@case-clinical/api/gender/data-access'

import { ApiGenderFeatureAdminResolver } from './api-gender-feature-admin.resolver'
import { ApiGenderFeaturePublicResolver } from './api-gender-feature-public.resolver'
import { ApiGenderFeatureUserResolver } from './api-gender-feature-user.resolver'

@Module({
  imports: [ApiGenderDataAccessModule],
  providers: [
        ApiGenderFeatureAdminResolver,
        ApiGenderFeaturePublicResolver,
        ApiGenderFeatureUserResolver
    ],
})
export class ApiGenderFeatureModule {}
