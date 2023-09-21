
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRecommendedOrderAuthorizationDataAccessAdminService } from './api-recommended-order-authorization-data-access-admin.service'
import { ApiRecommendedOrderAuthorizationDataAccessUserService } from './api-recommended-order-authorization-data-access-user.service'
import { ApiRecommendedOrderAuthorizationDataAccessPublicService } from './api-recommended-order-authorization-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRecommendedOrderAuthorizationDataAccessAdminService, ApiRecommendedOrderAuthorizationDataAccessUserService, ApiRecommendedOrderAuthorizationDataAccessPublicService],
  exports: [ApiRecommendedOrderAuthorizationDataAccessAdminService, ApiRecommendedOrderAuthorizationDataAccessUserService, ApiRecommendedOrderAuthorizationDataAccessPublicService],
})
export class ApiRecommendedOrderAuthorizationDataAccessModule {}
