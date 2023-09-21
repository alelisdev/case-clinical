
import { Module } from '@nestjs/common'
import { ApiRecommendedOrderDiagnosisCodeDataAccessModule } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'

import { ApiRecommendedOrderDiagnosisCodeFeatureAdminResolver } from './api-recommended-order-diagnosis-code-feature-admin.resolver'
import { ApiRecommendedOrderDiagnosisCodeFeaturePublicResolver } from './api-recommended-order-diagnosis-code-feature-public.resolver'
import { ApiRecommendedOrderDiagnosisCodeFeatureUserResolver } from './api-recommended-order-diagnosis-code-feature-user.resolver'

@Module({
  imports: [ApiRecommendedOrderDiagnosisCodeDataAccessModule],
  providers: [
        ApiRecommendedOrderDiagnosisCodeFeatureAdminResolver,
        ApiRecommendedOrderDiagnosisCodeFeaturePublicResolver,
        ApiRecommendedOrderDiagnosisCodeFeatureUserResolver
    ],
})
export class ApiRecommendedOrderDiagnosisCodeFeatureModule {}
