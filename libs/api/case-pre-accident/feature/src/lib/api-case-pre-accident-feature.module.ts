
import { Module } from '@nestjs/common'
import { ApiCasePreAccidentDataAccessModule } from '@case-clinical/api/case-pre-accident/data-access'

import { ApiCasePreAccidentFeatureAdminResolver } from './api-case-pre-accident-feature-admin.resolver'
import { ApiCasePreAccidentFeaturePublicResolver } from './api-case-pre-accident-feature-public.resolver'
import { ApiCasePreAccidentFeatureUserResolver } from './api-case-pre-accident-feature-user.resolver'

@Module({
  imports: [ApiCasePreAccidentDataAccessModule],
  providers: [
        ApiCasePreAccidentFeatureAdminResolver,
        ApiCasePreAccidentFeaturePublicResolver,
        ApiCasePreAccidentFeatureUserResolver
    ],
})
export class ApiCasePreAccidentFeatureModule {}
