
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseAccountPaymentDataAccessAdminService } from './api-case-account-payment-data-access-admin.service'
import { ApiCaseAccountPaymentDataAccessUserService } from './api-case-account-payment-data-access-user.service'
import { ApiCaseAccountPaymentDataAccessPublicService } from './api-case-account-payment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseAccountPaymentDataAccessAdminService, ApiCaseAccountPaymentDataAccessUserService, ApiCaseAccountPaymentDataAccessPublicService],
  exports: [ApiCaseAccountPaymentDataAccessAdminService, ApiCaseAccountPaymentDataAccessUserService, ApiCaseAccountPaymentDataAccessPublicService],
})
export class ApiCaseAccountPaymentDataAccessModule {}
