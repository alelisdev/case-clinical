
import { Module } from '@nestjs/common'
import { ApiContactKindDataAccessModule } from '@case-clinical/api/contact-kind/data-access'

import { ApiContactKindFeatureAdminResolver } from './api-contact-kind-feature-admin.resolver'
import { ApiContactKindFeaturePublicResolver } from './api-contact-kind-feature-public.resolver'
import { ApiContactKindFeatureUserResolver } from './api-contact-kind-feature-user.resolver'

@Module({
  imports: [ApiContactKindDataAccessModule],
  providers: [
        ApiContactKindFeatureAdminResolver,
        ApiContactKindFeaturePublicResolver,
        ApiContactKindFeatureUserResolver
    ],
})
export class ApiContactKindFeatureModule {}
