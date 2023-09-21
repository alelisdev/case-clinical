
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ApiLeadDataAccessModule } from '@case-clinical/api/lead/data-access'

import { ApiLeadFeatureAdminResolver } from './api-lead-feature-admin.resolver'
import { ApiLeadFeaturePublicResolver } from './api-lead-feature-public.resolver'
import { ApiLeadFeatureUserResolver } from './api-lead-feature-user.resolver'

@Module({
  imports: [ApiLeadDataAccessModule, HttpModule],
  providers: [
        ApiLeadFeatureAdminResolver,
        ApiLeadFeaturePublicResolver,
        ApiLeadFeatureUserResolver
    ],
})
export class ApiLeadFeatureModule {}
