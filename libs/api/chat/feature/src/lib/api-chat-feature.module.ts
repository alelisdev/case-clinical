
import { Module } from '@nestjs/common'
import { ApiChatDataAccessModule } from '@case-clinical/api/chat/data-access'

import { ApiChatFeatureAdminResolver } from './api-chat-feature-admin.resolver'
import { ApiChatFeaturePublicResolver } from './api-chat-feature-public.resolver'
import { ApiChatFeatureUserResolver } from './api-chat-feature-user.resolver'

@Module({
  imports: [ApiChatDataAccessModule],
  providers: [
        ApiChatFeatureAdminResolver,
        ApiChatFeaturePublicResolver,
        ApiChatFeatureUserResolver
    ],
})
export class ApiChatFeatureModule {}
