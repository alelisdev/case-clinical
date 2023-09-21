
import { Module } from '@nestjs/common'
import { ApiClinicalProviderTagDataAccessModule } from '@case-clinical/api/clinical-provider-tag/data-access'

import { ApiClinicalProviderTagFeatureAdminResolver } from './api-clinical-provider-tag-feature-admin.resolver'
import { ApiClinicalProviderTagFeaturePublicResolver } from './api-clinical-provider-tag-feature-public.resolver'
import { ApiClinicalProviderTagFeatureUserResolver } from './api-clinical-provider-tag-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderTagDataAccessModule],
  providers: [
        ApiClinicalProviderTagFeatureAdminResolver,
        ApiClinicalProviderTagFeaturePublicResolver,
        ApiClinicalProviderTagFeatureUserResolver
    ],
})
export class ApiClinicalProviderTagFeatureModule {}
