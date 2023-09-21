
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRoleFeatureDataAccessAdminService } from './api-role-feature-data-access-admin.service'
import { ApiRoleFeatureDataAccessPublicService } from './api-role-feature-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRoleFeatureDataAccessAdminService, ApiRoleFeatureDataAccessPublicService],
  exports: [ApiRoleFeatureDataAccessAdminService, ApiRoleFeatureDataAccessPublicService],
})
export class ApiRoleFeatureDataAccessModule {}
