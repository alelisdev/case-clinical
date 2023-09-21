
import { Module } from '@nestjs/common'
import { ApiLeadSourceDataAccessModule } from '@case-clinical/api/lead-source/data-access'

import { ApiLeadSourceFeatureAdminResolver } from './api-lead-source-feature-admin.resolver'
import { ApiLeadSourceFeaturePublicResolver } from './api-lead-source-feature-public.resolver'
import { ApiLeadSourceFeatureUserResolver } from './api-lead-source-feature-user.resolver'

@Module({
  imports: [ApiLeadSourceDataAccessModule],
  providers: [
        ApiLeadSourceFeatureAdminResolver,
        ApiLeadSourceFeaturePublicResolver,
        ApiLeadSourceFeatureUserResolver
    ],
})
export class ApiLeadSourceFeatureModule {}
