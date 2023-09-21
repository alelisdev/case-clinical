
import { Module } from '@nestjs/common'
import { ApiLeadActionDataAccessModule } from '@case-clinical/api/lead-action/data-access'

import { ApiLeadActionFeatureAdminResolver } from './api-lead-action-feature-admin.resolver'
import { ApiLeadActionFeaturePublicResolver } from './api-lead-action-feature-public.resolver'
import { ApiLeadActionFeatureUserResolver } from './api-lead-action-feature-user.resolver'

@Module({
  imports: [ApiLeadActionDataAccessModule],
  providers: [
        ApiLeadActionFeatureAdminResolver,
        ApiLeadActionFeaturePublicResolver,
        ApiLeadActionFeatureUserResolver
    ],
})
export class ApiLeadActionFeatureModule {}
