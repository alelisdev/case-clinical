
import { Module } from '@nestjs/common'
import { ApiBodyPartLeadDataAccessModule } from '@case-clinical/api/body-part-lead/data-access'

import { ApiBodyPartLeadFeatureAdminResolver } from './api-body-part-lead-feature-admin.resolver'
import { ApiBodyPartLeadFeaturePublicResolver } from './api-body-part-lead-feature-public.resolver'
import { ApiBodyPartLeadFeatureUserResolver } from './api-body-part-lead-feature-user.resolver'

@Module({
  imports: [ApiBodyPartLeadDataAccessModule],
  providers: [
        ApiBodyPartLeadFeatureAdminResolver,
        ApiBodyPartLeadFeaturePublicResolver,
        ApiBodyPartLeadFeatureUserResolver
    ],
})
export class ApiBodyPartLeadFeatureModule {}
