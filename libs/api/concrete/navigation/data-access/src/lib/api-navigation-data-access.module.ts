
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiNavigationDataAccessAdminService } from './api-navigation-data-access-admin.service'
import { ApiNavigationDataAccessUserService } from './api-navigation-data-access-user.service'
import { ApiNavigationDataAccessPublicService } from './api-navigation-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNavigationDataAccessAdminService, ApiNavigationDataAccessUserService, ApiNavigationDataAccessPublicService],
  exports: [ApiNavigationDataAccessAdminService, ApiNavigationDataAccessUserService, ApiNavigationDataAccessPublicService],
})
export class ApiNavigationDataAccessModule {}
