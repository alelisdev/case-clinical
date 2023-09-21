
import { Module } from '@nestjs/common'
import { ApiPriorMedsToDateStatusDataAccessModule } from '@case-clinical/api/prior-meds-to-date-status/data-access'

import { ApiPriorMedsToDateStatusFeatureAdminResolver } from './api-prior-meds-to-date-status-feature-admin.resolver'
import { ApiPriorMedsToDateStatusFeaturePublicResolver } from './api-prior-meds-to-date-status-feature-public.resolver'
import { ApiPriorMedsToDateStatusFeatureUserResolver } from './api-prior-meds-to-date-status-feature-user.resolver'

@Module({
  imports: [ApiPriorMedsToDateStatusDataAccessModule],
  providers: [
        ApiPriorMedsToDateStatusFeatureAdminResolver,
        ApiPriorMedsToDateStatusFeaturePublicResolver,
        ApiPriorMedsToDateStatusFeatureUserResolver
    ],
})
export class ApiPriorMedsToDateStatusFeatureModule {}
