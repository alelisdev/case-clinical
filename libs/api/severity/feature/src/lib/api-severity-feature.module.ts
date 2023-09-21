
import { Module } from '@nestjs/common'
import { ApiSeverityDataAccessModule } from '@case-clinical/api/severity/data-access'

import { ApiSeverityFeatureAdminResolver } from './api-severity-feature-admin.resolver'
import { ApiSeverityFeaturePublicResolver } from './api-severity-feature-public.resolver'
import { ApiSeverityFeatureUserResolver } from './api-severity-feature-user.resolver'

@Module({
  imports: [ApiSeverityDataAccessModule],
  providers: [
        ApiSeverityFeatureAdminResolver,
        ApiSeverityFeaturePublicResolver,
        ApiSeverityFeatureUserResolver
    ],
})
export class ApiSeverityFeatureModule {}
