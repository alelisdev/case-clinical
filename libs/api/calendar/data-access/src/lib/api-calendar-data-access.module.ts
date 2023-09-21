
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCalendarDataAccessAdminService } from './api-calendar-data-access-admin.service'
import { ApiCalendarDataAccessUserService } from './api-calendar-data-access-user.service'
import { ApiCalendarDataAccessPublicService } from './api-calendar-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCalendarDataAccessAdminService, ApiCalendarDataAccessUserService, ApiCalendarDataAccessPublicService],
  exports: [ApiCalendarDataAccessAdminService, ApiCalendarDataAccessUserService, ApiCalendarDataAccessPublicService],
})
export class ApiCalendarDataAccessModule {}
