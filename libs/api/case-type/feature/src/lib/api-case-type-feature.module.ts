
import { Module } from '@nestjs/common'
import { ApiCaseTypeDataAccessModule } from '@case-clinical/api/case-type/data-access'

import { ApiCaseTypeFeatureAdminResolver } from './api-case-type-feature-admin.resolver'
import { ApiCaseTypeFeaturePublicResolver } from './api-case-type-feature-public.resolver'
import { ApiCaseTypeFeatureUserResolver } from './api-case-type-feature-user.resolver'

@Module({
  imports: [ApiCaseTypeDataAccessModule],
  providers: [
        ApiCaseTypeFeatureAdminResolver,
        ApiCaseTypeFeaturePublicResolver,
        ApiCaseTypeFeatureUserResolver
    ],
})
export class ApiCaseTypeFeatureModule {}
