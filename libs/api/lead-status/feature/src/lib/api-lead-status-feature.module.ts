
import { Module } from '@nestjs/common'
import { ApiLeadStatusDataAccessModule } from '@case-clinical/api/lead-status/data-access'

import { ApiLeadStatusFeatureAdminResolver } from './api-lead-status-feature-admin.resolver'
import { ApiLeadStatusFeaturePublicResolver } from './api-lead-status-feature-public.resolver'
import { ApiLeadStatusFeatureUserResolver } from './api-lead-status-feature-user.resolver'

@Module({
  imports: [ApiLeadStatusDataAccessModule],
  providers: [
        ApiLeadStatusFeatureAdminResolver,
        ApiLeadStatusFeaturePublicResolver,
        ApiLeadStatusFeatureUserResolver
    ],
})
export class ApiLeadStatusFeatureModule {}
