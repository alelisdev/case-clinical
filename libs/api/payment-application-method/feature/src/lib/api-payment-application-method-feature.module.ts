
import { Module } from '@nestjs/common'
import { ApiPaymentApplicationMethodDataAccessModule } from '@case-clinical/api/payment-application-method/data-access'

import { ApiPaymentApplicationMethodFeatureAdminResolver } from './api-payment-application-method-feature-admin.resolver'
import { ApiPaymentApplicationMethodFeaturePublicResolver } from './api-payment-application-method-feature-public.resolver'
import { ApiPaymentApplicationMethodFeatureUserResolver } from './api-payment-application-method-feature-user.resolver'

@Module({
  imports: [ApiPaymentApplicationMethodDataAccessModule],
  providers: [
        ApiPaymentApplicationMethodFeatureAdminResolver,
        ApiPaymentApplicationMethodFeaturePublicResolver,
        ApiPaymentApplicationMethodFeatureUserResolver
    ],
})
export class ApiPaymentApplicationMethodFeatureModule {}
