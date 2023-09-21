
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiUserCalendarDataAccessAdminService } from './api-user-calendar-data-access-admin.service'
import { ApiUserCalendarDataAccessUserService } from './api-user-calendar-data-access-user.service'
import { ApiUserCalendarDataAccessPublicService } from './api-user-calendar-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserCalendarDataAccessAdminService, ApiUserCalendarDataAccessUserService, ApiUserCalendarDataAccessPublicService],
  exports: [ApiUserCalendarDataAccessAdminService, ApiUserCalendarDataAccessUserService, ApiUserCalendarDataAccessPublicService],
})
export class ApiUserCalendarDataAccessModule {}
