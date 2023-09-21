
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRoleDataAccessAdminService } from './api-role-data-access-admin.service'
import { ApiRoleDataAccessUserService } from './api-role-data-access-user.service'
import { ApiRoleDataAccessPublicService } from './api-role-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRoleDataAccessAdminService, ApiRoleDataAccessUserService, ApiRoleDataAccessPublicService],
  exports: [ApiRoleDataAccessAdminService, ApiRoleDataAccessUserService, ApiRoleDataAccessPublicService],
})
export class ApiRoleDataAccessModule {}
