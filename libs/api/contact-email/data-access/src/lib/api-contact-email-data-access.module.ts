
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactEmailDataAccessAdminService } from './api-contact-email-data-access-admin.service'
import { ApiContactEmailDataAccessUserService } from './api-contact-email-data-access-user.service'
import { ApiContactEmailDataAccessPublicService } from './api-contact-email-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactEmailDataAccessAdminService, ApiContactEmailDataAccessUserService, ApiContactEmailDataAccessPublicService],
  exports: [ApiContactEmailDataAccessAdminService, ApiContactEmailDataAccessUserService, ApiContactEmailDataAccessPublicService],
})
export class ApiContactEmailDataAccessModule {}
