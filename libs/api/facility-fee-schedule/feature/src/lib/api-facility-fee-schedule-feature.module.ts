
import { Module } from '@nestjs/common'
import { ApiFacilityFeeScheduleDataAccessModule } from '@case-clinical/api/facility-fee-schedule/data-access'

import { ApiFacilityFeeScheduleFeatureAdminResolver } from './api-facility-fee-schedule-feature-admin.resolver'
import { ApiFacilityFeeScheduleFeaturePublicResolver } from './api-facility-fee-schedule-feature-public.resolver'
import { ApiFacilityFeeScheduleFeatureUserResolver } from './api-facility-fee-schedule-feature-user.resolver'

@Module({
  imports: [ApiFacilityFeeScheduleDataAccessModule],
  providers: [
        ApiFacilityFeeScheduleFeatureAdminResolver,
        ApiFacilityFeeScheduleFeaturePublicResolver,
        ApiFacilityFeeScheduleFeatureUserResolver
    ],
})
export class ApiFacilityFeeScheduleFeatureModule {}
