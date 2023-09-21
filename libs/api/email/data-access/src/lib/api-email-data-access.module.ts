
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEmailDataAccessAdminService } from './api-email-data-access-admin.service'
import { ApiEmailDataAccessUserService } from './api-email-data-access-user.service'
import { ApiEmailDataAccessPublicService } from './api-email-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEmailDataAccessAdminService, ApiEmailDataAccessUserService, ApiEmailDataAccessPublicService],
  exports: [ApiEmailDataAccessAdminService, ApiEmailDataAccessUserService, ApiEmailDataAccessPublicService],
})
export class ApiEmailDataAccessModule {}
