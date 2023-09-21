
import { Module } from '@nestjs/common'
import { ApiSpecialtyDataAccessModule } from '@case-clinical/api/specialty/data-access'

import { ApiSpecialtyFeatureAdminResolver } from './api-specialty-feature-admin.resolver'
import { ApiSpecialtyFeaturePublicResolver } from './api-specialty-feature-public.resolver'
import { ApiSpecialtyFeatureUserResolver } from './api-specialty-feature-user.resolver'

@Module({
  imports: [ApiSpecialtyDataAccessModule],
  providers: [
        ApiSpecialtyFeatureAdminResolver,
        ApiSpecialtyFeaturePublicResolver,
        ApiSpecialtyFeatureUserResolver
    ],
})
export class ApiSpecialtyFeatureModule {}
