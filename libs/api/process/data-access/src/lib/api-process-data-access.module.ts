
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcessDataAccessAdminService } from './api-process-data-access-admin.service'
import { ApiProcessDataAccessUserService } from './api-process-data-access-user.service'
import { ApiProcessDataAccessPublicService } from './api-process-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcessDataAccessAdminService, ApiProcessDataAccessUserService, ApiProcessDataAccessPublicService],
  exports: [ApiProcessDataAccessAdminService, ApiProcessDataAccessUserService, ApiProcessDataAccessPublicService],
})
export class ApiProcessDataAccessModule {}
