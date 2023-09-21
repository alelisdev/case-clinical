
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactDataAccessAdminService } from './api-contact-data-access-admin.service'
import { ApiContactDataAccessUserService } from './api-contact-data-access-user.service'
import { ApiContactDataAccessPublicService } from './api-contact-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactDataAccessAdminService, ApiContactDataAccessUserService, ApiContactDataAccessPublicService],
  exports: [ApiContactDataAccessAdminService, ApiContactDataAccessUserService, ApiContactDataAccessPublicService],
})
export class ApiContactDataAccessModule {}
