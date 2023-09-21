
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFeeScheduleDataAccessAdminService } from './api-fee-schedule-data-access-admin.service'
import { ApiFeeScheduleDataAccessUserService } from './api-fee-schedule-data-access-user.service'
import { ApiFeeScheduleDataAccessPublicService } from './api-fee-schedule-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFeeScheduleDataAccessAdminService, ApiFeeScheduleDataAccessUserService, ApiFeeScheduleDataAccessPublicService],
  exports: [ApiFeeScheduleDataAccessAdminService, ApiFeeScheduleDataAccessUserService, ApiFeeScheduleDataAccessPublicService],
})
export class ApiFeeScheduleDataAccessModule {}
