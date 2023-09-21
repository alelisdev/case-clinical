
import { Module } from '@nestjs/common'
import { ApiCasePreInjuryDataAccessModule } from '@case-clinical/api/case-pre-injury/data-access'

import { ApiCasePreInjuryFeatureAdminResolver } from './api-case-pre-injury-feature-admin.resolver'
import { ApiCasePreInjuryFeaturePublicResolver } from './api-case-pre-injury-feature-public.resolver'
import { ApiCasePreInjuryFeatureUserResolver } from './api-case-pre-injury-feature-user.resolver'

@Module({
  imports: [ApiCasePreInjuryDataAccessModule],
  providers: [
        ApiCasePreInjuryFeatureAdminResolver,
        ApiCasePreInjuryFeaturePublicResolver,
        ApiCasePreInjuryFeatureUserResolver
    ],
})
export class ApiCasePreInjuryFeatureModule {}
