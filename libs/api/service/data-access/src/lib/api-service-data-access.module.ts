
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiServiceDataAccessAdminService } from './api-service-data-access-admin.service'
import { ApiServiceDataAccessUserService } from './api-service-data-access-user.service'
import { ApiServiceDataAccessPublicService } from './api-service-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiServiceDataAccessAdminService, ApiServiceDataAccessUserService, ApiServiceDataAccessPublicService],
  exports: [ApiServiceDataAccessAdminService, ApiServiceDataAccessUserService, ApiServiceDataAccessPublicService],
})
export class ApiServiceDataAccessModule {}
