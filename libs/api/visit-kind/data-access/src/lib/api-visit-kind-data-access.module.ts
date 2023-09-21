
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiVisitKindDataAccessAdminService } from './api-visit-kind-data-access-admin.service'
import { ApiVisitKindDataAccessUserService } from './api-visit-kind-data-access-user.service'
import { ApiVisitKindDataAccessPublicService } from './api-visit-kind-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiVisitKindDataAccessAdminService, ApiVisitKindDataAccessUserService, ApiVisitKindDataAccessPublicService],
  exports: [ApiVisitKindDataAccessAdminService, ApiVisitKindDataAccessUserService, ApiVisitKindDataAccessPublicService],
})
export class ApiVisitKindDataAccessModule {}
