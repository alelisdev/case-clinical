
import { Module } from '@nestjs/common'
import { ApiNovuNotificationDataAccessModule } from '@case-clinical/api/novu-notification/data-access'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAppointmentDataAccessAdminService } from './api-appointment-data-access-admin.service'
import { ApiAppointmentDataAccessUserService } from './api-appointment-data-access-user.service'
import { ApiAppointmentDataAccessPublicService } from './api-appointment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNovuNotificationDataAccessModule],
  providers: [ApiAppointmentDataAccessAdminService, ApiAppointmentDataAccessUserService, ApiAppointmentDataAccessPublicService],
  exports: [ApiAppointmentDataAccessAdminService, ApiAppointmentDataAccessUserService, ApiAppointmentDataAccessPublicService],
})
export class ApiAppointmentDataAccessModule {}
