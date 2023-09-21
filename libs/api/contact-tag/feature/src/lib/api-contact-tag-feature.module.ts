
import { Module } from '@nestjs/common'
import { ApiContactTagDataAccessModule } from '@case-clinical/api/contact-tag/data-access'

import { ApiContactTagFeatureAdminResolver } from './api-contact-tag-feature-admin.resolver'
import { ApiContactTagFeaturePublicResolver } from './api-contact-tag-feature-public.resolver'
import { ApiContactTagFeatureUserResolver } from './api-contact-tag-feature-user.resolver'

@Module({
  imports: [ApiContactTagDataAccessModule],
  providers: [
        ApiContactTagFeatureAdminResolver,
        ApiContactTagFeaturePublicResolver,
        ApiContactTagFeatureUserResolver
    ],
})
export class ApiContactTagFeatureModule {}
