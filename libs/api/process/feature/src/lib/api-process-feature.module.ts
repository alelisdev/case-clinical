
import { Module } from '@nestjs/common'
import { ApiProcessDataAccessModule } from '@case-clinical/api/process/data-access'

import { ApiProcessFeatureAdminResolver } from './api-process-feature-admin.resolver'
import { ApiProcessFeaturePublicResolver } from './api-process-feature-public.resolver'
import { ApiProcessFeatureUserResolver } from './api-process-feature-user.resolver'

@Module({
  imports: [ApiProcessDataAccessModule],
  providers: [
        ApiProcessFeatureAdminResolver,
        ApiProcessFeaturePublicResolver,
        ApiProcessFeatureUserResolver
    ],
})
export class ApiProcessFeatureModule {}
