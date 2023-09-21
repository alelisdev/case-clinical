
import { Module } from '@nestjs/common'
import { ApiWhereDoesItHurtDataAccessModule } from '@case-clinical/api/where-does-it-hurt/data-access'

import { ApiWhereDoesItHurtFeatureAdminResolver } from './api-where-does-it-hurt-feature-admin.resolver'
import { ApiWhereDoesItHurtFeaturePublicResolver } from './api-where-does-it-hurt-feature-public.resolver'
import { ApiWhereDoesItHurtFeatureUserResolver } from './api-where-does-it-hurt-feature-user.resolver'

@Module({
  imports: [ApiWhereDoesItHurtDataAccessModule],
  providers: [
        ApiWhereDoesItHurtFeatureAdminResolver,
        ApiWhereDoesItHurtFeaturePublicResolver,
        ApiWhereDoesItHurtFeatureUserResolver
    ],
})
export class ApiWhereDoesItHurtFeatureModule {}
