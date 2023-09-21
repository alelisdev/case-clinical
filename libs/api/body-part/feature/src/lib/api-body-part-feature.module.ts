
import { Module } from '@nestjs/common'
import { ApiBodyPartDataAccessModule } from '@case-clinical/api/body-part/data-access'

import { ApiBodyPartFeatureAdminResolver } from './api-body-part-feature-admin.resolver'
import { ApiBodyPartFeaturePublicResolver } from './api-body-part-feature-public.resolver'
import { ApiBodyPartFeatureUserResolver } from './api-body-part-feature-user.resolver'

@Module({
  imports: [ApiBodyPartDataAccessModule],
  providers: [
        ApiBodyPartFeatureAdminResolver,
        ApiBodyPartFeaturePublicResolver,
        ApiBodyPartFeatureUserResolver
    ],
})
export class ApiBodyPartFeatureModule {}
