
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAppointmentStatusDataAccessAdminService } from './api-appointment-status-data-access-admin.service'
import { ApiAppointmentStatusDataAccessUserService } from './api-appointment-status-data-access-user.service'
import { ApiAppointmentStatusDataAccessPublicService } from './api-appointment-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAppointmentStatusDataAccessAdminService, ApiAppointmentStatusDataAccessUserService, ApiAppointmentStatusDataAccessPublicService],
  exports: [ApiAppointmentStatusDataAccessAdminService, ApiAppointmentStatusDataAccessUserService, ApiAppointmentStatusDataAccessPublicService],
})
export class ApiAppointmentStatusDataAccessModule {}
