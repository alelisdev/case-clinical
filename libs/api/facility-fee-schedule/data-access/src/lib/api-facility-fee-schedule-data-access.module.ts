
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFacilityFeeScheduleDataAccessAdminService } from './api-facility-fee-schedule-data-access-admin.service'
import { ApiFacilityFeeScheduleDataAccessUserService } from './api-facility-fee-schedule-data-access-user.service'
import { ApiFacilityFeeScheduleDataAccessPublicService } from './api-facility-fee-schedule-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFacilityFeeScheduleDataAccessAdminService, ApiFacilityFeeScheduleDataAccessUserService, ApiFacilityFeeScheduleDataAccessPublicService],
  exports: [ApiFacilityFeeScheduleDataAccessAdminService, ApiFacilityFeeScheduleDataAccessUserService, ApiFacilityFeeScheduleDataAccessPublicService],
})
export class ApiFacilityFeeScheduleDataAccessModule {}
