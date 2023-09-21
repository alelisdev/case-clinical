
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPaymentTypeDataAccessAdminService } from './api-payment-type-data-access-admin.service'
import { ApiPaymentTypeDataAccessUserService } from './api-payment-type-data-access-user.service'
import { ApiPaymentTypeDataAccessPublicService } from './api-payment-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPaymentTypeDataAccessAdminService, ApiPaymentTypeDataAccessUserService, ApiPaymentTypeDataAccessPublicService],
  exports: [ApiPaymentTypeDataAccessAdminService, ApiPaymentTypeDataAccessUserService, ApiPaymentTypeDataAccessPublicService],
})
export class ApiPaymentTypeDataAccessModule {}
