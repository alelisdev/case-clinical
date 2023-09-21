
import { Module } from '@nestjs/common'
import { ApiCalendarWeekdayDataAccessModule } from '@case-clinical/api/calendar-weekday/data-access'

import { ApiCalendarWeekdayFeatureAdminResolver } from './api-calendar-weekday-feature-admin.resolver'
import { ApiCalendarWeekdayFeaturePublicResolver } from './api-calendar-weekday-feature-public.resolver'
import { ApiCalendarWeekdayFeatureUserResolver } from './api-calendar-weekday-feature-user.resolver'

@Module({
  imports: [ApiCalendarWeekdayDataAccessModule],
  providers: [
        ApiCalendarWeekdayFeatureAdminResolver,
        ApiCalendarWeekdayFeaturePublicResolver,
        ApiCalendarWeekdayFeatureUserResolver
    ],
})
export class ApiCalendarWeekdayFeatureModule {}
