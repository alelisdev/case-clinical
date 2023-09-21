
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPaymentDataAccessAdminService } from './api-payment-data-access-admin.service'
import { ApiPaymentDataAccessUserService } from './api-payment-data-access-user.service'
import { ApiPaymentDataAccessPublicService } from './api-payment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPaymentDataAccessAdminService, ApiPaymentDataAccessUserService, ApiPaymentDataAccessPublicService],
  exports: [ApiPaymentDataAccessAdminService, ApiPaymentDataAccessUserService, ApiPaymentDataAccessPublicService],
})
export class ApiPaymentDataAccessModule {}
