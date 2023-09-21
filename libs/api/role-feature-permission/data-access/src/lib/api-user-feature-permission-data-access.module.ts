
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiRoleFeaturePermissionDataAccessAdminService } from './api-role-feature-permission-data-access-admin.service'
import { ApiRoleFeaturePermissionDataAccessPublicService } from './api-role-feature-permission-data-access-public.service'
import { ApiNavigationDataAccessModule } from '@case-clinical/api/navigation/data-access'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNavigationDataAccessModule],
  providers: [ApiRoleFeaturePermissionDataAccessAdminService, ApiRoleFeaturePermissionDataAccessPublicService],
  exports: [ApiRoleFeaturePermissionDataAccessAdminService, ApiRoleFeaturePermissionDataAccessPublicService],
})
export class ApiRoleFeaturePermissionDataAccessModule {}
