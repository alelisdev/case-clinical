
import { Module } from '@nestjs/common'
import { ApiCalculationBasisTypeDataAccessModule } from '@case-clinical/api/calculation-basis-type/data-access'

import { ApiCalculationBasisTypeFeatureAdminResolver } from './api-calculation-basis-type-feature-admin.resolver'
import { ApiCalculationBasisTypeFeaturePublicResolver } from './api-calculation-basis-type-feature-public.resolver'
import { ApiCalculationBasisTypeFeatureUserResolver } from './api-calculation-basis-type-feature-user.resolver'

@Module({
  imports: [ApiCalculationBasisTypeDataAccessModule],
  providers: [
        ApiCalculationBasisTypeFeatureAdminResolver,
        ApiCalculationBasisTypeFeaturePublicResolver,
        ApiCalculationBasisTypeFeatureUserResolver
    ],
})
export class ApiCalculationBasisTypeFeatureModule {}
