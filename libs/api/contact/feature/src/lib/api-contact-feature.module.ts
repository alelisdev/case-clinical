
import { Module } from '@nestjs/common'
import { ApiContactDataAccessModule } from '@case-clinical/api/contact/data-access'

import { ApiContactFeatureAdminResolver } from './api-contact-feature-admin.resolver'
import { ApiContactFeaturePublicResolver } from './api-contact-feature-public.resolver'
import { ApiContactFeatureUserResolver } from './api-contact-feature-user.resolver'

@Module({
  imports: [ApiContactDataAccessModule],
  providers: [
        ApiContactFeatureAdminResolver,
        ApiContactFeaturePublicResolver,
        ApiContactFeatureUserResolver
    ],
})
export class ApiContactFeatureModule {}
