
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTaskItemDataAccessAdminService } from './api-task-item-data-access-admin.service'
import { ApiTaskItemDataAccessUserService } from './api-task-item-data-access-user.service'
import { ApiTaskItemDataAccessPublicService } from './api-task-item-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTaskItemDataAccessAdminService, ApiTaskItemDataAccessUserService, ApiTaskItemDataAccessPublicService],
  exports: [ApiTaskItemDataAccessAdminService, ApiTaskItemDataAccessUserService, ApiTaskItemDataAccessPublicService],
})
export class ApiTaskItemDataAccessModule {}
