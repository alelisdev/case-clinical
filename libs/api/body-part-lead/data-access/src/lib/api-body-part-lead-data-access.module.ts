
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBodyPartLeadDataAccessAdminService } from './api-body-part-lead-data-access-admin.service'
import { ApiBodyPartLeadDataAccessUserService } from './api-body-part-lead-data-access-user.service'
import { ApiBodyPartLeadDataAccessPublicService } from './api-body-part-lead-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBodyPartLeadDataAccessAdminService, ApiBodyPartLeadDataAccessUserService, ApiBodyPartLeadDataAccessPublicService],
  exports: [ApiBodyPartLeadDataAccessAdminService, ApiBodyPartLeadDataAccessUserService, ApiBodyPartLeadDataAccessPublicService],
})
export class ApiBodyPartLeadDataAccessModule {}
