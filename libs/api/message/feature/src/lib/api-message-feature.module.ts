
import { Module } from '@nestjs/common'
import { ApiMessageDataAccessModule } from '@case-clinical/api/message/data-access'

import { ApiMessageFeatureAdminResolver } from './api-message-feature-admin.resolver'
import { ApiMessageFeaturePublicResolver } from './api-message-feature-public.resolver'
import { ApiMessageFeatureUserResolver } from './api-message-feature-user.resolver'

@Module({
  imports: [ApiMessageDataAccessModule],
  providers: [
        ApiMessageFeatureAdminResolver,
        ApiMessageFeaturePublicResolver,
        ApiMessageFeatureUserResolver
    ],
})
export class ApiMessageFeatureModule {}
