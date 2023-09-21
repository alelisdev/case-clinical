
import { Module } from '@nestjs/common'
import { ApiAccidentTypeDataAccessModule } from '@case-clinical/api/accident-type/data-access'

import { ApiAccidentTypeFeatureAdminResolver } from './api-accident-type-feature-admin.resolver'
import { ApiAccidentTypeFeaturePublicResolver } from './api-accident-type-feature-public.resolver'
import { ApiAccidentTypeFeatureUserResolver } from './api-accident-type-feature-user.resolver'

@Module({
  imports: [ApiAccidentTypeDataAccessModule],
  providers: [
        ApiAccidentTypeFeatureAdminResolver,
        ApiAccidentTypeFeaturePublicResolver,
        ApiAccidentTypeFeatureUserResolver
    ],
})
export class ApiAccidentTypeFeatureModule {}
