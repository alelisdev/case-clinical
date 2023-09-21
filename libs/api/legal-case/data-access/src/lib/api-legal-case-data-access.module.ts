
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLegalCaseDataAccessAdminService } from './api-legal-case-data-access-admin.service'
import { ApiLegalCaseDataAccessUserService } from './api-legal-case-data-access-user.service'
import { ApiLegalCaseDataAccessPublicService } from './api-legal-case-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLegalCaseDataAccessAdminService, ApiLegalCaseDataAccessUserService, ApiLegalCaseDataAccessPublicService],
  exports: [ApiLegalCaseDataAccessAdminService, ApiLegalCaseDataAccessUserService, ApiLegalCaseDataAccessPublicService],
})
export class ApiLegalCaseDataAccessModule {}
