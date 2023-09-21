
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactKindDataAccessAdminService } from './api-contact-kind-data-access-admin.service'
import { ApiContactKindDataAccessUserService } from './api-contact-kind-data-access-user.service'
import { ApiContactKindDataAccessPublicService } from './api-contact-kind-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactKindDataAccessAdminService, ApiContactKindDataAccessUserService, ApiContactKindDataAccessPublicService],
  exports: [ApiContactKindDataAccessAdminService, ApiContactKindDataAccessUserService, ApiContactKindDataAccessPublicService],
})
export class ApiContactKindDataAccessModule {}
