
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactTagDataAccessAdminService } from './api-contact-tag-data-access-admin.service'
import { ApiContactTagDataAccessUserService } from './api-contact-tag-data-access-user.service'
import { ApiContactTagDataAccessPublicService } from './api-contact-tag-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactTagDataAccessAdminService, ApiContactTagDataAccessUserService, ApiContactTagDataAccessPublicService],
  exports: [ApiContactTagDataAccessAdminService, ApiContactTagDataAccessUserService, ApiContactTagDataAccessPublicService],
})
export class ApiContactTagDataAccessModule {}
