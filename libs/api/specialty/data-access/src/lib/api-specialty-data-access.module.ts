
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiSpecialtyDataAccessAdminService } from './api-specialty-data-access-admin.service'
import { ApiSpecialtyDataAccessUserService } from './api-specialty-data-access-user.service'
import { ApiSpecialtyDataAccessPublicService } from './api-specialty-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSpecialtyDataAccessAdminService, ApiSpecialtyDataAccessUserService, ApiSpecialtyDataAccessPublicService],
  exports: [ApiSpecialtyDataAccessAdminService, ApiSpecialtyDataAccessUserService, ApiSpecialtyDataAccessPublicService],
})
export class ApiSpecialtyDataAccessModule {}
