
import { Module } from '@nestjs/common'
import { ApiUserCalendarDataAccessModule } from '@case-clinical/api/user-calendar/data-access'

import { ApiUserCalendarFeatureAdminResolver } from './api-user-calendar-feature-admin.resolver'
import { ApiUserCalendarFeaturePublicResolver } from './api-user-calendar-feature-public.resolver'
import { ApiUserCalendarFeatureUserResolver } from './api-user-calendar-feature-user.resolver'

@Module({
  imports: [ApiUserCalendarDataAccessModule],
  providers: [
        ApiUserCalendarFeatureAdminResolver,
        ApiUserCalendarFeaturePublicResolver,
        ApiUserCalendarFeatureUserResolver
    ],
})
export class ApiUserCalendarFeatureModule {}
