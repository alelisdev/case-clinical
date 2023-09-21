
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLocationDataAccessAdminService } from './api-location-data-access-admin.service'
import { ApiLocationDataAccessUserService } from './api-location-data-access-user.service'
import { ApiLocationDataAccessPublicService } from './api-location-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLocationDataAccessAdminService, ApiLocationDataAccessUserService, ApiLocationDataAccessPublicService],
  exports: [ApiLocationDataAccessAdminService, ApiLocationDataAccessUserService, ApiLocationDataAccessPublicService],
})
export class ApiLocationDataAccessModule {}
