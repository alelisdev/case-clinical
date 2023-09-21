
import { Module } from '@nestjs/common'
import { ApiIntegrationDataAccessModule } from '@case-clinical/api/integration/data-access'

import { ApiIntegrationFeatureAdminResolver } from './api-integration-feature-admin.resolver'
import { ApiIntegrationFeaturePublicResolver } from './api-integration-feature-public.resolver'
import { ApiIntegrationFeatureUserResolver } from './api-integration-feature-user.resolver'

@Module({
  imports: [ApiIntegrationDataAccessModule],
  providers: [
        ApiIntegrationFeatureAdminResolver,
        ApiIntegrationFeaturePublicResolver,
        ApiIntegrationFeatureUserResolver
    ],
})
export class ApiIntegrationFeatureModule {}
