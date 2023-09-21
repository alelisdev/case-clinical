
import { Module } from '@nestjs/common'
import { ApiAttorneyTypeDataAccessModule } from '@case-clinical/api/attorney-type/data-access'

import { ApiAttorneyTypeFeatureAdminResolver } from './api-attorney-type-feature-admin.resolver'
import { ApiAttorneyTypeFeaturePublicResolver } from './api-attorney-type-feature-public.resolver'
import { ApiAttorneyTypeFeatureUserResolver } from './api-attorney-type-feature-user.resolver'

@Module({
  imports: [ApiAttorneyTypeDataAccessModule],
  providers: [
        ApiAttorneyTypeFeatureAdminResolver,
        ApiAttorneyTypeFeaturePublicResolver,
        ApiAttorneyTypeFeatureUserResolver
    ],
})
export class ApiAttorneyTypeFeatureModule {}
