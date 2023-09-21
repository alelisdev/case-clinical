
import { Module } from '@nestjs/common'
import { ApiWhereDoesItHurtSpecialtyDataAccessModule } from '@case-clinical/api/where-does-it-hurt-specialty/data-access'

import { ApiWhereDoesItHurtSpecialtyFeatureAdminResolver } from './api-where-does-it-hurt-specialty-feature-admin.resolver'
import { ApiWhereDoesItHurtSpecialtyFeaturePublicResolver } from './api-where-does-it-hurt-specialty-feature-public.resolver'
import { ApiWhereDoesItHurtSpecialtyFeatureUserResolver } from './api-where-does-it-hurt-specialty-feature-user.resolver'

@Module({
  imports: [ApiWhereDoesItHurtSpecialtyDataAccessModule],
  providers: [
        ApiWhereDoesItHurtSpecialtyFeatureAdminResolver,
        ApiWhereDoesItHurtSpecialtyFeaturePublicResolver,
        ApiWhereDoesItHurtSpecialtyFeatureUserResolver
    ],
})
export class ApiWhereDoesItHurtSpecialtyFeatureModule {}
