
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPaymentApplicationMethodDataAccessAdminService } from './api-payment-application-method-data-access-admin.service'
import { ApiPaymentApplicationMethodDataAccessUserService } from './api-payment-application-method-data-access-user.service'
import { ApiPaymentApplicationMethodDataAccessPublicService } from './api-payment-application-method-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPaymentApplicationMethodDataAccessAdminService, ApiPaymentApplicationMethodDataAccessUserService, ApiPaymentApplicationMethodDataAccessPublicService],
  exports: [ApiPaymentApplicationMethodDataAccessAdminService, ApiPaymentApplicationMethodDataAccessUserService, ApiPaymentApplicationMethodDataAccessPublicService],
})
export class ApiPaymentApplicationMethodDataAccessModule {}
