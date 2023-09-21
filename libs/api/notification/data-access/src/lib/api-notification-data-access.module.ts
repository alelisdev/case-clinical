
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiNotificationDataAccessAdminService } from './api-notification-data-access-admin.service'
import { ApiNotificationDataAccessUserService } from './api-notification-data-access-user.service'
import { ApiNotificationDataAccessPublicService } from './api-notification-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNotificationDataAccessAdminService, ApiNotificationDataAccessUserService, ApiNotificationDataAccessPublicService],
  exports: [ApiNotificationDataAccessAdminService, ApiNotificationDataAccessUserService, ApiNotificationDataAccessPublicService],
})
export class ApiNotificationDataAccessModule {}
