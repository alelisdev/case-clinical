
import { Module } from '@nestjs/common'
import { ApiAppointmentStatusDataAccessModule } from '@case-clinical/api/appointment-status/data-access'

import { ApiAppointmentStatusFeatureAdminResolver } from './api-appointment-status-feature-admin.resolver'
import { ApiAppointmentStatusFeaturePublicResolver } from './api-appointment-status-feature-public.resolver'
import { ApiAppointmentStatusFeatureUserResolver } from './api-appointment-status-feature-user.resolver'

@Module({
  imports: [ApiAppointmentStatusDataAccessModule],
  providers: [
        ApiAppointmentStatusFeatureAdminResolver,
        ApiAppointmentStatusFeaturePublicResolver,
        ApiAppointmentStatusFeatureUserResolver
    ],
})
export class ApiAppointmentStatusFeatureModule {}
