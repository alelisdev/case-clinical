
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTaskTagDataAccessAdminService } from './api-task-tag-data-access-admin.service'
import { ApiTaskTagDataAccessUserService } from './api-task-tag-data-access-user.service'
import { ApiTaskTagDataAccessPublicService } from './api-task-tag-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTaskTagDataAccessAdminService, ApiTaskTagDataAccessUserService, ApiTaskTagDataAccessPublicService],
  exports: [ApiTaskTagDataAccessAdminService, ApiTaskTagDataAccessUserService, ApiTaskTagDataAccessPublicService],
})
export class ApiTaskTagDataAccessModule {}
