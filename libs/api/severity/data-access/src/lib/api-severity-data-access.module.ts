
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiSeverityDataAccessAdminService } from './api-severity-data-access-admin.service'
import { ApiSeverityDataAccessUserService } from './api-severity-data-access-user.service'
import { ApiSeverityDataAccessPublicService } from './api-severity-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSeverityDataAccessAdminService, ApiSeverityDataAccessUserService, ApiSeverityDataAccessPublicService],
  exports: [ApiSeverityDataAccessAdminService, ApiSeverityDataAccessUserService, ApiSeverityDataAccessPublicService],
})
export class ApiSeverityDataAccessModule {}
