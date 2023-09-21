
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRequiredFieldDataAccessAdminService } from './api-required-field-data-access-admin.service'
import { ApiRequiredFieldDataAccessUserService } from './api-required-field-data-access-user.service'
import { ApiRequiredFieldDataAccessPublicService } from './api-required-field-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRequiredFieldDataAccessAdminService, ApiRequiredFieldDataAccessUserService, ApiRequiredFieldDataAccessPublicService],
  exports: [ApiRequiredFieldDataAccessAdminService, ApiRequiredFieldDataAccessUserService, ApiRequiredFieldDataAccessPublicService],
})
export class ApiRequiredFieldDataAccessModule {}
