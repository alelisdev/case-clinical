
import { Module } from '@nestjs/common'
import { ApiEmailDataAccessModule } from '@case-clinical/api/email/data-access'

import { ApiEmailFeatureAdminResolver } from './api-email-feature-admin.resolver'
import { ApiEmailFeaturePublicResolver } from './api-email-feature-public.resolver'
import { ApiEmailFeatureUserResolver } from './api-email-feature-user.resolver'

@Module({
  imports: [ApiEmailDataAccessModule],
  providers: [
        ApiEmailFeatureAdminResolver,
        ApiEmailFeaturePublicResolver,
        ApiEmailFeatureUserResolver
    ],
})
export class ApiEmailFeatureModule {}
