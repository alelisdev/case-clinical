
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiIntegrationDataAccessAdminService } from './api-integration-data-access-admin.service'
import { ApiIntegrationDataAccessUserService } from './api-integration-data-access-user.service'
import { ApiIntegrationDataAccessPublicService } from './api-integration-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiIntegrationDataAccessAdminService, ApiIntegrationDataAccessUserService, ApiIntegrationDataAccessPublicService],
  exports: [ApiIntegrationDataAccessAdminService, ApiIntegrationDataAccessUserService, ApiIntegrationDataAccessPublicService],
})
export class ApiIntegrationDataAccessModule {}
