
import { Module } from '@nestjs/common'
import { ApiPaymentDataAccessModule } from '@case-clinical/api/payment/data-access'

import { ApiPaymentFeatureAdminResolver } from './api-payment-feature-admin.resolver'
import { ApiPaymentFeaturePublicResolver } from './api-payment-feature-public.resolver'
import { ApiPaymentFeatureUserResolver } from './api-payment-feature-user.resolver'

@Module({
  imports: [ApiPaymentDataAccessModule],
  providers: [
        ApiPaymentFeatureAdminResolver,
        ApiPaymentFeaturePublicResolver,
        ApiPaymentFeatureUserResolver
    ],
})
export class ApiPaymentFeatureModule {}
