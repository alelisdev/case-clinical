
import { Module } from '@nestjs/common'
import { ApiFeeScheduleDataAccessModule } from '@case-clinical/api/fee-schedule/data-access'

import { ApiFeeScheduleFeatureAdminResolver } from './api-fee-schedule-feature-admin.resolver'
import { ApiFeeScheduleFeaturePublicResolver } from './api-fee-schedule-feature-public.resolver'
import { ApiFeeScheduleFeatureUserResolver } from './api-fee-schedule-feature-user.resolver'

@Module({
  imports: [ApiFeeScheduleDataAccessModule],
  providers: [
        ApiFeeScheduleFeatureAdminResolver,
        ApiFeeScheduleFeaturePublicResolver,
        ApiFeeScheduleFeatureUserResolver
    ],
})
export class ApiFeeScheduleFeatureModule {}
