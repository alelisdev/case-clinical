
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRequestAdditionalVisitDataAccessAdminService } from './api-request-additional-visit-data-access-admin.service'
import { ApiRequestAdditionalVisitDataAccessUserService } from './api-request-additional-visit-data-access-user.service'
import { ApiRequestAdditionalVisitDataAccessPublicService } from './api-request-additional-visit-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRequestAdditionalVisitDataAccessAdminService, ApiRequestAdditionalVisitDataAccessUserService, ApiRequestAdditionalVisitDataAccessPublicService],
  exports: [ApiRequestAdditionalVisitDataAccessAdminService, ApiRequestAdditionalVisitDataAccessUserService, ApiRequestAdditionalVisitDataAccessPublicService],
})
export class ApiRequestAdditionalVisitDataAccessModule {}
