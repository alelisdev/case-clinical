
import { Module } from '@nestjs/common'
import { ApiClinicalProviderSpecialtyDataAccessModule } from '@case-clinical/api/clinical-provider-specialty/data-access'

import { ApiClinicalProviderSpecialtyFeatureAdminResolver } from './api-clinical-provider-specialty-feature-admin.resolver'
import { ApiClinicalProviderSpecialtyFeaturePublicResolver } from './api-clinical-provider-specialty-feature-public.resolver'
import { ApiClinicalProviderSpecialtyFeatureUserResolver } from './api-clinical-provider-specialty-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderSpecialtyDataAccessModule],
  providers: [
        ApiClinicalProviderSpecialtyFeatureAdminResolver,
        ApiClinicalProviderSpecialtyFeaturePublicResolver,
        ApiClinicalProviderSpecialtyFeatureUserResolver
    ],
})
export class ApiClinicalProviderSpecialtyFeatureModule {}
