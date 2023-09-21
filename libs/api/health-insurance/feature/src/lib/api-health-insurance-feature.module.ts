
import { Module } from '@nestjs/common'
import { ApiHealthInsuranceDataAccessModule } from '@case-clinical/api/health-insurance/data-access'

import { ApiHealthInsuranceFeatureAdminResolver } from './api-health-insurance-feature-admin.resolver'
import { ApiHealthInsuranceFeaturePublicResolver } from './api-health-insurance-feature-public.resolver'
import { ApiHealthInsuranceFeatureUserResolver } from './api-health-insurance-feature-user.resolver'

@Module({
  imports: [ApiHealthInsuranceDataAccessModule],
  providers: [
        ApiHealthInsuranceFeatureAdminResolver,
        ApiHealthInsuranceFeaturePublicResolver,
        ApiHealthInsuranceFeatureUserResolver
    ],
})
export class ApiHealthInsuranceFeatureModule {}
