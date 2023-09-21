
import { Module } from '@nestjs/common'
import { ApiClinicalProviderServiceDataAccessModule } from '@case-clinical/api/clinical-provider-service/data-access'

import { ApiClinicalProviderServiceFeatureAdminResolver } from './api-clinical-provider-service-feature-admin.resolver'
import { ApiClinicalProviderServiceFeaturePublicResolver } from './api-clinical-provider-service-feature-public.resolver'
import { ApiClinicalProviderServiceFeatureUserResolver } from './api-clinical-provider-service-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderServiceDataAccessModule],
  providers: [
        ApiClinicalProviderServiceFeatureAdminResolver,
        ApiClinicalProviderServiceFeaturePublicResolver,
        ApiClinicalProviderServiceFeatureUserResolver
    ],
})
export class ApiClinicalProviderServiceFeatureModule {}
