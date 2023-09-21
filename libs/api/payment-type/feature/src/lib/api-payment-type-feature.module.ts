
import { Module } from '@nestjs/common'
import { ApiPaymentTypeDataAccessModule } from '@case-clinical/api/payment-type/data-access'

import { ApiPaymentTypeFeatureAdminResolver } from './api-payment-type-feature-admin.resolver'
import { ApiPaymentTypeFeaturePublicResolver } from './api-payment-type-feature-public.resolver'
import { ApiPaymentTypeFeatureUserResolver } from './api-payment-type-feature-user.resolver'

@Module({
  imports: [ApiPaymentTypeDataAccessModule],
  providers: [
        ApiPaymentTypeFeatureAdminResolver,
        ApiPaymentTypeFeaturePublicResolver,
        ApiPaymentTypeFeatureUserResolver
    ],
})
export class ApiPaymentTypeFeatureModule {}
