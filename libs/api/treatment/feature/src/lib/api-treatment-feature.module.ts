
import { Module } from '@nestjs/common'
import { ApiTreatmentDataAccessModule } from '@case-clinical/api/treatment/data-access'

import { ApiTreatmentFeatureAdminResolver } from './api-treatment-feature-admin.resolver'
import { ApiTreatmentFeaturePublicResolver } from './api-treatment-feature-public.resolver'
import { ApiTreatmentFeatureUserResolver } from './api-treatment-feature-user.resolver'

@Module({
  imports: [ApiTreatmentDataAccessModule],
  providers: [
        ApiTreatmentFeatureAdminResolver,
        ApiTreatmentFeaturePublicResolver,
        ApiTreatmentFeatureUserResolver
    ],
})
export class ApiTreatmentFeatureModule {}
