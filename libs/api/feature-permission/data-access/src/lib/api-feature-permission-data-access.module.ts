
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFeaturePermissionDataAccessAdminService } from './api-feature-permission-data-access-admin.service'
import { ApiFeaturePermissionDataAccessUserService } from './api-feature-permission-data-access-user.service'
import { ApiFeaturePermissionDataAccessPublicService } from './api-feature-permission-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFeaturePermissionDataAccessAdminService, ApiFeaturePermissionDataAccessUserService, ApiFeaturePermissionDataAccessPublicService],
  exports: [ApiFeaturePermissionDataAccessAdminService, ApiFeaturePermissionDataAccessUserService, ApiFeaturePermissionDataAccessPublicService],
})
export class ApiFeaturePermissionDataAccessModule {}
