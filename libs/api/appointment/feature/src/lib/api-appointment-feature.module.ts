
import { Module } from '@nestjs/common'
import { ApiAppointmentDataAccessModule } from '@case-clinical/api/appointment/data-access'

import { ApiAppointmentFeatureAdminResolver } from './api-appointment-feature-admin.resolver'
import { ApiAppointmentFeaturePublicResolver } from './api-appointment-feature-public.resolver'
import { ApiAppointmentFeatureUserResolver } from './api-appointment-feature-user.resolver'
import { ApiClaimDataAccessModule } from '@case-clinical/api/claim/data-access'

@Module({
  imports: [ApiAppointmentDataAccessModule, ApiClaimDataAccessModule],
  providers: [
        ApiAppointmentFeatureAdminResolver,
        ApiAppointmentFeaturePublicResolver,
        ApiAppointmentFeatureUserResolver
    ],
})
export class ApiAppointmentFeatureModule {}
