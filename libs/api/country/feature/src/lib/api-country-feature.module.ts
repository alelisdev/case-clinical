
import { Module } from '@nestjs/common'
import { ApiCountryDataAccessModule } from '@case-clinical/api/country/data-access'

import { ApiCountryFeatureAdminResolver } from './api-country-feature-admin.resolver'
import { ApiCountryFeaturePublicResolver } from './api-country-feature-public.resolver'
import { ApiCountryFeatureUserResolver } from './api-country-feature-user.resolver'

@Module({
  imports: [ApiCountryDataAccessModule],
  providers: [
        ApiCountryFeatureAdminResolver,
        ApiCountryFeaturePublicResolver,
        ApiCountryFeatureUserResolver
    ],
})
export class ApiCountryFeatureModule {}
