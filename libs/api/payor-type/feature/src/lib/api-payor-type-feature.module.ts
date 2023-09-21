
import { Module } from '@nestjs/common'
import { ApiPayorTypeDataAccessModule } from '@case-clinical/api/payor-type/data-access'

import { ApiPayorTypeFeatureAdminResolver } from './api-payor-type-feature-admin.resolver'
import { ApiPayorTypeFeaturePublicResolver } from './api-payor-type-feature-public.resolver'
import { ApiPayorTypeFeatureUserResolver } from './api-payor-type-feature-user.resolver'

@Module({
  imports: [ApiPayorTypeDataAccessModule],
  providers: [
        ApiPayorTypeFeatureAdminResolver,
        ApiPayorTypeFeaturePublicResolver,
        ApiPayorTypeFeatureUserResolver
    ],
})
export class ApiPayorTypeFeatureModule {}
