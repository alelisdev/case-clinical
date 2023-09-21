
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFeatureDataAccessAdminService } from './api-feature-data-access-admin.service'
import { ApiFeatureDataAccessUserService } from './api-feature-data-access-user.service'
import { ApiFeatureDataAccessPublicService } from './api-feature-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFeatureDataAccessAdminService, ApiFeatureDataAccessUserService, ApiFeatureDataAccessPublicService],
  exports: [ApiFeatureDataAccessAdminService, ApiFeatureDataAccessUserService, ApiFeatureDataAccessPublicService],
})
export class ApiFeatureDataAccessModule {}
