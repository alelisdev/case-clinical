
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTemplateDataAccessAdminService } from './api-template-data-access-admin.service'
import { ApiTemplateDataAccessUserService } from './api-template-data-access-user.service'
import { ApiTemplateDataAccessPublicService } from './api-template-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTemplateDataAccessAdminService, ApiTemplateDataAccessUserService, ApiTemplateDataAccessPublicService],
  exports: [ApiTemplateDataAccessAdminService, ApiTemplateDataAccessUserService, ApiTemplateDataAccessPublicService],
})
export class ApiTemplateDataAccessModule {}
