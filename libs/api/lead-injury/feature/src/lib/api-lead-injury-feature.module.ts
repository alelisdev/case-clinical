
import { Module } from '@nestjs/common'
import { ApiLeadInjuryDataAccessModule } from '@case-clinical/api/lead-injury/data-access'

import { ApiLeadInjuryFeatureAdminResolver } from './api-lead-injury-feature-admin.resolver'
import { ApiLeadInjuryFeaturePublicResolver } from './api-lead-injury-feature-public.resolver'
import { ApiLeadInjuryFeatureUserResolver } from './api-lead-injury-feature-user.resolver'

@Module({
  imports: [ApiLeadInjuryDataAccessModule],
  providers: [
        ApiLeadInjuryFeatureAdminResolver,
        ApiLeadInjuryFeaturePublicResolver,
        ApiLeadInjuryFeatureUserResolver
    ],
})
export class ApiLeadInjuryFeatureModule {}
