
import { Module } from '@nestjs/common'
import { ApiPriorMedsToDateDataAccessModule } from '@case-clinical/api/prior-meds-to-date/data-access'

import { ApiPriorMedsToDateFeatureAdminResolver } from './api-prior-meds-to-date-feature-admin.resolver'
import { ApiPriorMedsToDateFeaturePublicResolver } from './api-prior-meds-to-date-feature-public.resolver'
import { ApiPriorMedsToDateFeatureUserResolver } from './api-prior-meds-to-date-feature-user.resolver'

@Module({
  imports: [ApiPriorMedsToDateDataAccessModule],
  providers: [
        ApiPriorMedsToDateFeatureAdminResolver,
        ApiPriorMedsToDateFeaturePublicResolver,
        ApiPriorMedsToDateFeatureUserResolver
    ],
})
export class ApiPriorMedsToDateFeatureModule {}
