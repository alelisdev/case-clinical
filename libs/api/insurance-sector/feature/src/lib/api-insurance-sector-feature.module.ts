
import { Module } from '@nestjs/common'
import { ApiInsuranceSectorDataAccessModule } from '@case-clinical/api/insurance-sector/data-access'

import { ApiInsuranceSectorFeatureAdminResolver } from './api-insurance-sector-feature-admin.resolver'
import { ApiInsuranceSectorFeaturePublicResolver } from './api-insurance-sector-feature-public.resolver'
import { ApiInsuranceSectorFeatureUserResolver } from './api-insurance-sector-feature-user.resolver'

@Module({
  imports: [ApiInsuranceSectorDataAccessModule],
  providers: [
        ApiInsuranceSectorFeatureAdminResolver,
        ApiInsuranceSectorFeaturePublicResolver,
        ApiInsuranceSectorFeatureUserResolver
    ],
})
export class ApiInsuranceSectorFeatureModule {}
