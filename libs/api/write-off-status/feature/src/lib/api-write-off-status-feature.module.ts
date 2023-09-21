
import { Module } from '@nestjs/common'
import { ApiWriteOffStatusDataAccessModule } from '@case-clinical/api/write-off-status/data-access'

import { ApiWriteOffStatusFeatureAdminResolver } from './api-write-off-status-feature-admin.resolver'
import { ApiWriteOffStatusFeaturePublicResolver } from './api-write-off-status-feature-public.resolver'
import { ApiWriteOffStatusFeatureUserResolver } from './api-write-off-status-feature-user.resolver'

@Module({
  imports: [ApiWriteOffStatusDataAccessModule],
  providers: [
        ApiWriteOffStatusFeatureAdminResolver,
        ApiWriteOffStatusFeaturePublicResolver,
        ApiWriteOffStatusFeatureUserResolver
    ],
})
export class ApiWriteOffStatusFeatureModule {}
