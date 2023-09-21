
import { Module } from '@nestjs/common'
import { ApiCalendarTypeDataAccessModule } from '@case-clinical/api/calendar-type/data-access'

import { ApiCalendarTypeFeatureAdminResolver } from './api-calendar-type-feature-admin.resolver'
import { ApiCalendarTypeFeaturePublicResolver } from './api-calendar-type-feature-public.resolver'
import { ApiCalendarTypeFeatureUserResolver } from './api-calendar-type-feature-user.resolver'

@Module({
  imports: [ApiCalendarTypeDataAccessModule],
  providers: [
        ApiCalendarTypeFeatureAdminResolver,
        ApiCalendarTypeFeaturePublicResolver,
        ApiCalendarTypeFeatureUserResolver
    ],
})
export class ApiCalendarTypeFeatureModule {}
