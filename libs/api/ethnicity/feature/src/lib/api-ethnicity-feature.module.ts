
import { Module } from '@nestjs/common'
import { ApiEthnicityDataAccessModule } from '@case-clinical/api/ethnicity/data-access'

import { ApiEthnicityFeatureAdminResolver } from './api-ethnicity-feature-admin.resolver'
import { ApiEthnicityFeaturePublicResolver } from './api-ethnicity-feature-public.resolver'
import { ApiEthnicityFeatureUserResolver } from './api-ethnicity-feature-user.resolver'

@Module({
  imports: [ApiEthnicityDataAccessModule],
  providers: [
        ApiEthnicityFeatureAdminResolver,
        ApiEthnicityFeaturePublicResolver,
        ApiEthnicityFeatureUserResolver
    ],
})
export class ApiEthnicityFeatureModule {}
