
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiWhereDoesItHurtSpecialtyDataAccessAdminService } from './api-where-does-it-hurt-specialty-data-access-admin.service'
import { ApiWhereDoesItHurtSpecialtyDataAccessUserService } from './api-where-does-it-hurt-specialty-data-access-user.service'
import { ApiWhereDoesItHurtSpecialtyDataAccessPublicService } from './api-where-does-it-hurt-specialty-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiWhereDoesItHurtSpecialtyDataAccessAdminService, ApiWhereDoesItHurtSpecialtyDataAccessUserService, ApiWhereDoesItHurtSpecialtyDataAccessPublicService],
  exports: [ApiWhereDoesItHurtSpecialtyDataAccessAdminService, ApiWhereDoesItHurtSpecialtyDataAccessUserService, ApiWhereDoesItHurtSpecialtyDataAccessPublicService],
})
export class ApiWhereDoesItHurtSpecialtyDataAccessModule {}
