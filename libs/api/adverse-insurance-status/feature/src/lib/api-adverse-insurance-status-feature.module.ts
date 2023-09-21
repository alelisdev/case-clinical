
import { Module } from '@nestjs/common'
import { ApiAdverseInsuranceStatusDataAccessModule } from '@case-clinical/api/adverse-insurance-status/data-access'

import { ApiAdverseInsuranceStatusFeatureAdminResolver } from './api-adverse-insurance-status-feature-admin.resolver'
import { ApiAdverseInsuranceStatusFeaturePublicResolver } from './api-adverse-insurance-status-feature-public.resolver'
import { ApiAdverseInsuranceStatusFeatureUserResolver } from './api-adverse-insurance-status-feature-user.resolver'

@Module({
  imports: [ApiAdverseInsuranceStatusDataAccessModule],
  providers: [
        ApiAdverseInsuranceStatusFeatureAdminResolver,
        ApiAdverseInsuranceStatusFeaturePublicResolver,
        ApiAdverseInsuranceStatusFeatureUserResolver
    ],
})
export class ApiAdverseInsuranceStatusFeatureModule {}
