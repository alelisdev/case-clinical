
import { Module } from '@nestjs/common'
import { ApiCaseStatusDataAccessModule } from '@case-clinical/api/case-status/data-access'

import { ApiCaseStatusFeatureAdminResolver } from './api-case-status-feature-admin.resolver'
import { ApiCaseStatusFeaturePublicResolver } from './api-case-status-feature-public.resolver'
import { ApiCaseStatusFeatureUserResolver } from './api-case-status-feature-user.resolver'

@Module({
  imports: [ApiCaseStatusDataAccessModule],
  providers: [
        ApiCaseStatusFeatureAdminResolver,
        ApiCaseStatusFeaturePublicResolver,
        ApiCaseStatusFeatureUserResolver
    ],
})
export class ApiCaseStatusFeatureModule {}
