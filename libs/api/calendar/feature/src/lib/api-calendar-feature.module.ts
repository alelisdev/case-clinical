
import { Module } from '@nestjs/common'
import { ApiCalendarDataAccessModule } from '@case-clinical/api/calendar/data-access'

import { ApiCalendarFeatureAdminResolver } from './api-calendar-feature-admin.resolver'
import { ApiCalendarFeaturePublicResolver } from './api-calendar-feature-public.resolver'
import { ApiCalendarFeatureUserResolver } from './api-calendar-feature-user.resolver'

@Module({
  imports: [ApiCalendarDataAccessModule],
  providers: [
        ApiCalendarFeatureAdminResolver,
        ApiCalendarFeaturePublicResolver,
        ApiCalendarFeatureUserResolver
    ],
})
export class ApiCalendarFeatureModule {}
