
import { Module } from '@nestjs/common'
import { ApiContactEmailDataAccessModule } from '@case-clinical/api/contact-email/data-access'

import { ApiContactEmailFeatureAdminResolver } from './api-contact-email-feature-admin.resolver'
import { ApiContactEmailFeaturePublicResolver } from './api-contact-email-feature-public.resolver'
import { ApiContactEmailFeatureUserResolver } from './api-contact-email-feature-user.resolver'

@Module({
  imports: [ApiContactEmailDataAccessModule],
  providers: [
        ApiContactEmailFeatureAdminResolver,
        ApiContactEmailFeaturePublicResolver,
        ApiContactEmailFeatureUserResolver
    ],
})
export class ApiContactEmailFeatureModule {}
