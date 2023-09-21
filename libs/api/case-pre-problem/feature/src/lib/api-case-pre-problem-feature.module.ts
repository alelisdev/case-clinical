
import { Module } from '@nestjs/common'
import { ApiCasePreProblemDataAccessModule } from '@case-clinical/api/case-pre-problem/data-access'

import { ApiCasePreProblemFeatureAdminResolver } from './api-case-pre-problem-feature-admin.resolver'
import { ApiCasePreProblemFeaturePublicResolver } from './api-case-pre-problem-feature-public.resolver'
import { ApiCasePreProblemFeatureUserResolver } from './api-case-pre-problem-feature-user.resolver'

@Module({
  imports: [ApiCasePreProblemDataAccessModule],
  providers: [
        ApiCasePreProblemFeatureAdminResolver,
        ApiCasePreProblemFeaturePublicResolver,
        ApiCasePreProblemFeatureUserResolver
    ],
})
export class ApiCasePreProblemFeatureModule {}
