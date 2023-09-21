
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiUserFeatureDataAccessAdminService } from './api-user-feature-data-access-admin.service'
import { ApiUserFeatureDataAccessUserService } from './api-user-feature-data-access-user.service'
import { ApiUserFeatureDataAccessPublicService } from './api-user-feature-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserFeatureDataAccessAdminService, ApiUserFeatureDataAccessUserService, ApiUserFeatureDataAccessPublicService],
  exports: [ApiUserFeatureDataAccessAdminService, ApiUserFeatureDataAccessUserService, ApiUserFeatureDataAccessPublicService],
})
export class ApiUserFeatureDataAccessModule {}
