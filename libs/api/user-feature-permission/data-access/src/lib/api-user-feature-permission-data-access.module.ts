import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiUserFeaturePermissionDataAccessAdminService } from './api-user-feature-permission-data-access-admin.service'
import { ApiUserFeaturePermissionDataAccessUserService } from './api-user-feature-permission-data-access-user.service'
import { ApiUserFeaturePermissionDataAccessPublicService } from './api-user-feature-permission-data-access-public.service'
import { ApiNavigationDataAccessModule } from '@case-clinical/api/navigation/data-access'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNavigationDataAccessModule],
  providers: [ApiUserFeaturePermissionDataAccessAdminService, ApiUserFeaturePermissionDataAccessUserService, ApiUserFeaturePermissionDataAccessPublicService],
  exports: [ApiUserFeaturePermissionDataAccessAdminService, ApiUserFeaturePermissionDataAccessUserService, ApiUserFeaturePermissionDataAccessPublicService],
})
export class ApiUserFeaturePermissionDataAccessModule {}
