
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCalendarTypeDataAccessAdminService } from './api-calendar-type-data-access-admin.service'
import { ApiCalendarTypeDataAccessUserService } from './api-calendar-type-data-access-user.service'
import { ApiCalendarTypeDataAccessPublicService } from './api-calendar-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCalendarTypeDataAccessAdminService, ApiCalendarTypeDataAccessUserService, ApiCalendarTypeDataAccessPublicService],
  exports: [ApiCalendarTypeDataAccessAdminService, ApiCalendarTypeDataAccessUserService, ApiCalendarTypeDataAccessPublicService],
})
export class ApiCalendarTypeDataAccessModule {}
