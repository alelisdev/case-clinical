
import { Module } from '@nestjs/common'
import { ApiLegalCaseDataAccessModule } from '@case-clinical/api/legal-case/data-access'

import { ApiLegalCaseFeatureAdminResolver } from './api-legal-case-feature-admin.resolver'
import { ApiLegalCaseFeaturePublicResolver } from './api-legal-case-feature-public.resolver'
import { ApiLegalCaseFeatureUserResolver } from './api-legal-case-feature-user.resolver'

@Module({
  imports: [ApiLegalCaseDataAccessModule],
  providers: [
        ApiLegalCaseFeatureAdminResolver,
        ApiLegalCaseFeaturePublicResolver,
        ApiLegalCaseFeatureUserResolver
    ],
})
export class ApiLegalCaseFeatureModule {}
