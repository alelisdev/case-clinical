
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMessageDataAccessAdminService } from './api-message-data-access-admin.service'
import { ApiMessageDataAccessUserService } from './api-message-data-access-user.service'
import { ApiMessageDataAccessPublicService } from './api-message-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMessageDataAccessAdminService, ApiMessageDataAccessUserService, ApiMessageDataAccessPublicService],
  exports: [ApiMessageDataAccessAdminService, ApiMessageDataAccessUserService, ApiMessageDataAccessPublicService],
})
export class ApiMessageDataAccessModule {}
