
import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '../../../data-access/src'

import { ApiUserFeatureAdminResolver } from './api-user-feature-admin.resolver'
import { ApiUserFeaturePublicResolver } from './api-user-feature-public.resolver'
import { ApiUserFeatureUserResolver } from './api-user-feature-user.resolver'
import { ApiChatUserFeatureResolver } from './api-chat-user-feature.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [
        ApiUserFeatureAdminResolver,
        ApiUserFeaturePublicResolver,
        ApiUserFeatureUserResolver,
        ApiChatUserFeatureResolver
    ],
})
export class ApiUserFeatureModule {}
