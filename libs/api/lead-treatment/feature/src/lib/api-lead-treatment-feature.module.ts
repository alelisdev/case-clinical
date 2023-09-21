
import { Module } from '@nestjs/common'
import { ApiLeadTreatmentDataAccessModule } from '@case-clinical/api/lead-treatment/data-access'

import { ApiLeadTreatmentFeatureAdminResolver } from './api-lead-treatment-feature-admin.resolver'
import { ApiLeadTreatmentFeaturePublicResolver } from './api-lead-treatment-feature-public.resolver'
import { ApiLeadTreatmentFeatureUserResolver } from './api-lead-treatment-feature-user.resolver'

@Module({
  imports: [ApiLeadTreatmentDataAccessModule],
  providers: [
        ApiLeadTreatmentFeatureAdminResolver,
        ApiLeadTreatmentFeaturePublicResolver,
        ApiLeadTreatmentFeatureUserResolver
    ],
})
export class ApiLeadTreatmentFeatureModule {}
