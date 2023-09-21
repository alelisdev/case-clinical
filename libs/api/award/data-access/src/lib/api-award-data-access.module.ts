
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAwardDataAccessAdminService } from './api-award-data-access-admin.service'
import { ApiAwardDataAccessUserService } from './api-award-data-access-user.service'
import { ApiAwardDataAccessPublicService } from './api-award-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAwardDataAccessAdminService, ApiAwardDataAccessUserService, ApiAwardDataAccessPublicService],
  exports: [ApiAwardDataAccessAdminService, ApiAwardDataAccessUserService, ApiAwardDataAccessPublicService],
})
export class ApiAwardDataAccessModule {}
