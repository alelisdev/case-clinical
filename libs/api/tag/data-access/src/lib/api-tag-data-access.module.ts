
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTagDataAccessAdminService } from './api-tag-data-access-admin.service'
import { ApiTagDataAccessUserService } from './api-tag-data-access-user.service'
import { ApiTagDataAccessPublicService } from './api-tag-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTagDataAccessAdminService, ApiTagDataAccessUserService, ApiTagDataAccessPublicService],
  exports: [ApiTagDataAccessAdminService, ApiTagDataAccessUserService, ApiTagDataAccessPublicService],
})
export class ApiTagDataAccessModule {}
