
import { Module } from '@nestjs/common'
import { ApiAttorneyStatusDataAccessModule } from '@case-clinical/api/attorney-status/data-access'

import { ApiAttorneyStatusFeatureAdminResolver } from './api-attorney-status-feature-admin.resolver'
import { ApiAttorneyStatusFeaturePublicResolver } from './api-attorney-status-feature-public.resolver'
import { ApiAttorneyStatusFeatureUserResolver } from './api-attorney-status-feature-user.resolver'

@Module({
  imports: [ApiAttorneyStatusDataAccessModule],
  providers: [
        ApiAttorneyStatusFeatureAdminResolver,
        ApiAttorneyStatusFeaturePublicResolver,
        ApiAttorneyStatusFeatureUserResolver
    ],
})
export class ApiAttorneyStatusFeatureModule {}
