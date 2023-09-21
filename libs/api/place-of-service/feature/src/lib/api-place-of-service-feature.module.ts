
import { Module } from '@nestjs/common'
import { ApiPlaceOfServiceDataAccessModule } from '@case-clinical/api/place-of-service/data-access'

import { ApiPlaceOfServiceFeatureAdminResolver } from './api-place-of-service-feature-admin.resolver'
import { ApiPlaceOfServiceFeaturePublicResolver } from './api-place-of-service-feature-public.resolver'
import { ApiPlaceOfServiceFeatureUserResolver } from './api-place-of-service-feature-user.resolver'

@Module({
  imports: [ApiPlaceOfServiceDataAccessModule],
  providers: [
        ApiPlaceOfServiceFeatureAdminResolver,
        ApiPlaceOfServiceFeaturePublicResolver,
        ApiPlaceOfServiceFeatureUserResolver
    ],
})
export class ApiPlaceOfServiceFeatureModule {}
