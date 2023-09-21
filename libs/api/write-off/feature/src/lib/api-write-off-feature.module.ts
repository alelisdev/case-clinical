
import { Module } from '@nestjs/common'
import { ApiWriteOffDataAccessModule } from '@case-clinical/api/write-off/data-access'

import { ApiWriteOffFeatureAdminResolver } from './api-write-off-feature-admin.resolver'
import { ApiWriteOffFeaturePublicResolver } from './api-write-off-feature-public.resolver'
import { ApiWriteOffFeatureUserResolver } from './api-write-off-feature-user.resolver'

@Module({
  imports: [ApiWriteOffDataAccessModule],
  providers: [
        ApiWriteOffFeatureAdminResolver,
        ApiWriteOffFeaturePublicResolver,
        ApiWriteOffFeatureUserResolver
    ],
})
export class ApiWriteOffFeatureModule {}
