
import { Module } from '@nestjs/common'
import { ApiCaseProgressStatusDataAccessModule } from '@case-clinical/api/case-progress-status/data-access'

import { ApiCaseProgressStatusFeatureAdminResolver } from './api-case-progress-status-feature-admin.resolver'
import { ApiCaseProgressStatusFeaturePublicResolver } from './api-case-progress-status-feature-public.resolver'
import { ApiCaseProgressStatusFeatureUserResolver } from './api-case-progress-status-feature-user.resolver'

@Module({
  imports: [ApiCaseProgressStatusDataAccessModule],
  providers: [
        ApiCaseProgressStatusFeatureAdminResolver,
        ApiCaseProgressStatusFeaturePublicResolver,
        ApiCaseProgressStatusFeatureUserResolver
    ],
})
export class ApiCaseProgressStatusFeatureModule {}
