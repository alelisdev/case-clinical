
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '../../../../../core/data-access/src'

import { ApiUserDataAccessAdminService } from './api-user-data-access-admin.service'
import { ApiUserDataAccessUserService } from './api-user-data-access-user.service'
import { ApiUserDataAccessPublicService } from './api-user-data-access-public.service'
import { ApiChatUsersDataAccessService } from './api-chat-users-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserDataAccessAdminService, ApiUserDataAccessUserService, ApiUserDataAccessPublicService,ApiChatUsersDataAccessService],
  exports: [ApiUserDataAccessAdminService, ApiUserDataAccessUserService, ApiUserDataAccessPublicService,ApiChatUsersDataAccessService],
})
export class ApiUserDataAccessModule {}
