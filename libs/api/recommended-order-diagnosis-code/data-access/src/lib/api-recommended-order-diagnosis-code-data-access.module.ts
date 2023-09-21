
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiRecommendedOrderDiagnosisCodeDataAccessAdminService } from './api-recommended-order-diagnosis-code-data-access-admin.service'
import { ApiRecommendedOrderDiagnosisCodeDataAccessUserService } from './api-recommended-order-diagnosis-code-data-access-user.service'
import { ApiRecommendedOrderDiagnosisCodeDataAccessPublicService } from './api-recommended-order-diagnosis-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRecommendedOrderDiagnosisCodeDataAccessAdminService, ApiRecommendedOrderDiagnosisCodeDataAccessUserService, ApiRecommendedOrderDiagnosisCodeDataAccessPublicService],
  exports: [ApiRecommendedOrderDiagnosisCodeDataAccessAdminService, ApiRecommendedOrderDiagnosisCodeDataAccessUserService, ApiRecommendedOrderDiagnosisCodeDataAccessPublicService],
})
export class ApiRecommendedOrderDiagnosisCodeDataAccessModule {}
