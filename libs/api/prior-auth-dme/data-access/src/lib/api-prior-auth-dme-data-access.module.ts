
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthDmeDataAccessAdminService } from './api-prior-auth-dme-data-access-admin.service'
import { ApiPriorAuthDmeDataAccessUserService } from './api-prior-auth-dme-data-access-user.service'
import { ApiPriorAuthDmeDataAccessPublicService } from './api-prior-auth-dme-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthDmeDataAccessAdminService, ApiPriorAuthDmeDataAccessUserService, ApiPriorAuthDmeDataAccessPublicService],
  exports: [ApiPriorAuthDmeDataAccessAdminService, ApiPriorAuthDmeDataAccessUserService, ApiPriorAuthDmeDataAccessPublicService],
})
export class ApiPriorAuthDmeDataAccessModule {}
