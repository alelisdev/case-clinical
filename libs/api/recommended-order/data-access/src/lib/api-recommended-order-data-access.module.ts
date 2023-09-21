
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRecommendedOrderDataAccessAdminService } from './api-recommended-order-data-access-admin.service'
import { ApiRecommendedOrderDataAccessUserService } from './api-recommended-order-data-access-user.service'
import { ApiRecommendedOrderDataAccessPublicService } from './api-recommended-order-data-access-public.service'
import { ApiRecommendedOrderDiagnosisCodeDataAccessModule } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'

@Module({
  imports: [ApiCoreDataAccessModule, ApiRecommendedOrderDiagnosisCodeDataAccessModule],
  providers: [ApiRecommendedOrderDataAccessAdminService, ApiRecommendedOrderDataAccessUserService, ApiRecommendedOrderDataAccessPublicService],
  exports: [ApiRecommendedOrderDataAccessAdminService, ApiRecommendedOrderDataAccessUserService, ApiRecommendedOrderDataAccessPublicService],
})
export class ApiRecommendedOrderDataAccessModule {}
