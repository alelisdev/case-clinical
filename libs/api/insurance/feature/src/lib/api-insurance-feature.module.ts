
import { Module } from '@nestjs/common'
import { ApiInsuranceDataAccessModule } from '@case-clinical/api/insurance/data-access'

import { ApiInsuranceFeatureAdminResolver } from './api-insurance-feature-admin.resolver'
import { ApiInsuranceFeaturePublicResolver } from './api-insurance-feature-public.resolver'
import { ApiInsuranceFeatureUserResolver } from './api-insurance-feature-user.resolver'

@Module({
  imports: [ApiInsuranceDataAccessModule],
  providers: [
        ApiInsuranceFeatureAdminResolver,
        ApiInsuranceFeaturePublicResolver,
        ApiInsuranceFeatureUserResolver
    ],
})
export class ApiInsuranceFeatureModule {}
