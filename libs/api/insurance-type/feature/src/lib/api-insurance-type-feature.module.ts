
import { Module } from '@nestjs/common'
import { ApiInsuranceTypeDataAccessModule } from '@case-clinical/api/insurance-type/data-access'

import { ApiInsuranceTypeFeatureAdminResolver } from './api-insurance-type-feature-admin.resolver'
import { ApiInsuranceTypeFeaturePublicResolver } from './api-insurance-type-feature-public.resolver'
import { ApiInsuranceTypeFeatureUserResolver } from './api-insurance-type-feature-user.resolver'

@Module({
  imports: [ApiInsuranceTypeDataAccessModule],
  providers: [
        ApiInsuranceTypeFeatureAdminResolver,
        ApiInsuranceTypeFeaturePublicResolver,
        ApiInsuranceTypeFeatureUserResolver
    ],
})
export class ApiInsuranceTypeFeatureModule {}
