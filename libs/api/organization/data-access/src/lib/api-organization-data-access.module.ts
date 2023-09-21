
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiOrganizationDataAccessAdminService } from './api-organization-data-access-admin.service'
import { ApiOrganizationDataAccessUserService } from './api-organization-data-access-user.service'
import { ApiOrganizationDataAccessPublicService } from './api-organization-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiOrganizationDataAccessAdminService, ApiOrganizationDataAccessUserService, ApiOrganizationDataAccessPublicService],
  exports: [ApiOrganizationDataAccessAdminService, ApiOrganizationDataAccessUserService, ApiOrganizationDataAccessPublicService],
})
export class ApiOrganizationDataAccessModule {}
