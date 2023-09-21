
import { Module } from '@nestjs/common'
import { ApiCaseAccountDataAccessModule } from '@case-clinical/api/case-account/data-access'

import { ApiCaseAccountFeatureAdminResolver } from './api-case-account-feature-admin.resolver'
import { ApiCaseAccountFeaturePublicResolver } from './api-case-account-feature-public.resolver'
import { ApiCaseAccountFeatureUserResolver } from './api-case-account-feature-user.resolver'

@Module({
  imports: [ApiCaseAccountDataAccessModule],
  providers: [
        ApiCaseAccountFeatureAdminResolver,
        ApiCaseAccountFeaturePublicResolver,
        ApiCaseAccountFeatureUserResolver
    ],
})
export class ApiCaseAccountFeatureModule {}
