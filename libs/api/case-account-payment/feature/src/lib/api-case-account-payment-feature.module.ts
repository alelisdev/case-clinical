
import { Module } from '@nestjs/common'
import { ApiCaseAccountPaymentDataAccessModule } from '@case-clinical/api/case-account-payment/data-access'

import { ApiCaseAccountPaymentFeatureAdminResolver } from './api-case-account-payment-feature-admin.resolver'
import { ApiCaseAccountPaymentFeaturePublicResolver } from './api-case-account-payment-feature-public.resolver'
import { ApiCaseAccountPaymentFeatureUserResolver } from './api-case-account-payment-feature-user.resolver'

@Module({
  imports: [ApiCaseAccountPaymentDataAccessModule],
  providers: [
        ApiCaseAccountPaymentFeatureAdminResolver,
        ApiCaseAccountPaymentFeaturePublicResolver,
        ApiCaseAccountPaymentFeatureUserResolver
    ],
})
export class ApiCaseAccountPaymentFeatureModule {}
