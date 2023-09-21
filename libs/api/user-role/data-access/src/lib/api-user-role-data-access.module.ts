
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiUserRoleDataAccessAdminService } from './api-user-role-data-access-admin.service'
import { ApiUserRoleDataAccessUserService } from './api-user-role-data-access-user.service'
import { ApiUserRoleDataAccessPublicService } from './api-user-role-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserRoleDataAccessAdminService, ApiUserRoleDataAccessUserService, ApiUserRoleDataAccessPublicService],
  exports: [ApiUserRoleDataAccessAdminService, ApiUserRoleDataAccessUserService, ApiUserRoleDataAccessPublicService],
})
export class ApiUserRoleDataAccessModule {}
