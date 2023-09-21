
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiChatDataAccessAdminService } from './api-chat-data-access-admin.service'
import { ApiChatDataAccessUserService } from './api-chat-data-access-user.service'
import { ApiChatDataAccessPublicService } from './api-chat-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiChatDataAccessAdminService, ApiChatDataAccessUserService, ApiChatDataAccessPublicService],
  exports: [ApiChatDataAccessAdminService, ApiChatDataAccessUserService, ApiChatDataAccessPublicService],
})
export class ApiChatDataAccessModule {}
