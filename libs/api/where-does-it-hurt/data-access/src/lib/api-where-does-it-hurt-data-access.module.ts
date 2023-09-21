
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiWhereDoesItHurtDataAccessAdminService } from './api-where-does-it-hurt-data-access-admin.service'
import { ApiWhereDoesItHurtDataAccessUserService } from './api-where-does-it-hurt-data-access-user.service'
import { ApiWhereDoesItHurtDataAccessPublicService } from './api-where-does-it-hurt-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiWhereDoesItHurtDataAccessAdminService, ApiWhereDoesItHurtDataAccessUserService, ApiWhereDoesItHurtDataAccessPublicService],
  exports: [ApiWhereDoesItHurtDataAccessAdminService, ApiWhereDoesItHurtDataAccessUserService, ApiWhereDoesItHurtDataAccessPublicService],
})
export class ApiWhereDoesItHurtDataAccessModule {}
