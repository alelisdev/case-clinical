
import { Module } from '@nestjs/common'
import { ApiImplantDataAccessModule } from '@case-clinical/api/implant/data-access'

import { ApiImplantFeatureAdminResolver } from './api-implant-feature-admin.resolver'
import { ApiImplantFeaturePublicResolver } from './api-implant-feature-public.resolver'
import { ApiImplantFeatureUserResolver } from './api-implant-feature-user.resolver'

@Module({
  imports: [ApiImplantDataAccessModule],
  providers: [
        ApiImplantFeatureAdminResolver,
        ApiImplantFeaturePublicResolver,
        ApiImplantFeatureUserResolver
    ],
})
export class ApiImplantFeatureModule {}
