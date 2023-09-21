
import { Module } from '@nestjs/common'
import { ApiAgreementTypeDataAccessModule } from '@case-clinical/api/agreement-type/data-access'

import { ApiAgreementTypeFeatureAdminResolver } from './api-agreement-type-feature-admin.resolver'
import { ApiAgreementTypeFeaturePublicResolver } from './api-agreement-type-feature-public.resolver'
import { ApiAgreementTypeFeatureUserResolver } from './api-agreement-type-feature-user.resolver'

@Module({
  imports: [ApiAgreementTypeDataAccessModule],
  providers: [
        ApiAgreementTypeFeatureAdminResolver,
        ApiAgreementTypeFeaturePublicResolver,
        ApiAgreementTypeFeatureUserResolver
    ],
})
export class ApiAgreementTypeFeatureModule {}
