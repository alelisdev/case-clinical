
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCalendarWeekdayDataAccessAdminService } from './api-calendar-weekday-data-access-admin.service'
import { ApiCalendarWeekdayDataAccessUserService } from './api-calendar-weekday-data-access-user.service'
import { ApiCalendarWeekdayDataAccessPublicService } from './api-calendar-weekday-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCalendarWeekdayDataAccessAdminService, ApiCalendarWeekdayDataAccessUserService, ApiCalendarWeekdayDataAccessPublicService],
  exports: [ApiCalendarWeekdayDataAccessAdminService, ApiCalendarWeekdayDataAccessUserService, ApiCalendarWeekdayDataAccessPublicService],
})
export class ApiCalendarWeekdayDataAccessModule {}
