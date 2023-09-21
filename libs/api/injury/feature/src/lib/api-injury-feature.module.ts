
import { Module } from '@nestjs/common'
import { ApiInjuryDataAccessModule } from '@case-clinical/api/injury/data-access'

import { ApiInjuryFeatureAdminResolver } from './api-injury-feature-admin.resolver'
import { ApiInjuryFeaturePublicResolver } from './api-injury-feature-public.resolver'
import { ApiInjuryFeatureUserResolver } from './api-injury-feature-user.resolver'

@Module({
  imports: [ApiInjuryDataAccessModule],
  providers: [
        ApiInjuryFeatureAdminResolver,
        ApiInjuryFeaturePublicResolver,
        ApiInjuryFeatureUserResolver
    ],
})
export class ApiInjuryFeatureModule {}
